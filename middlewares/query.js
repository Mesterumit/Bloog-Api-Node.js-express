const query = (model,populate)=>async(req,res,next)=>{
    // search/Filter functionality
    // url:5000?search[first-name]=value&seacrh[last_name]=value2
    const search = req.query.search || {}
    for (let key in search) {
        search[key]= {$regex:search[key], $options:'i'}
    }
    let query = model.find(search);

    // Select
    // first need to sperate it by come and make it array
    // after retunr it into string back
    // url:5000?select= first_name,last_name
    if(req.query.select){
        const fields = req.query.select.split(',').join(' ')
        query = query.select(fields)
    }
    // console.log(search)
    // Sort
    if(req.query.sort){
        query = req.query.sort()
        
    }else{
        //Default
        query=query.sort('-createdAt')
    }

    // Pagination
    // url:5000/api/posts/page=1&limit=5
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100;
    const startIndex = (page-1)*limit;
    const endIndex = page*limit;
    const total = await model.countDocuments()
    query = query.skip(startIndex).limit(endIndex)
    const pagination = {page,limit};
    if(endIndex<total) pagination.next={page:page+1, limit} 
    if(startIndex>0) pagination.prev={page:page-1, limit} 


    if(populate && !req.query.select) query= query.populate(populate);

    // Execute the query and fetch data from db:

   const results = await query;
   res.results = {
    success:true,
    count: results.length,
    data :results,
    pagination
   }
//    console.log(results)
    next()
}
module.exports = query;