// sample usage
// options = {
//     populate: { path:'', select: '' },
//     select: ''
// }
// ROUTE?page=1&limit=2
exports.paginatedData = async (req,model,options = {}) => {
    const page = parseInt(req.query.page) ?? 1;
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const results = {};
    if(startIndex > 0)
    {
        results.previous = {
            page: page - 1,
            limit
        };
    }
    
    try{
        if(endIndex < await model.countDocuments().exec())
        {
            results.next = {
                page: page+1,
                limit
            };
        }

        let query = model.find().skip(startIndex).limit(limit);
        if(options?.populate)
        {
            const { path, select } = options.populate;
            query = query.populate(path, select);
        }
        if(options?.select)
        {
            query = query.select(options.select);
        }
        results.result = await query.exec();

        return {success: true, results};
    } catch (error) {
        return {success: false, message: error.message};
    }
};