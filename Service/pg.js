
const findAll = async(tableName,params) =>{
    const data = select("*").from(tableName)
    .where('name','like',`%${params.term}%`)
    .limit(params.limit).offset(params.page)
    
    return data
}

module.exports = {findAll}