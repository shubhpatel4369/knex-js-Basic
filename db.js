const findAll = require("./Service/pg")
const  getAllfoods = async(page_q,limit_q,term)=>{
    let params = {
      page:page_q,
      limit:limit_q,
      term:term
    }
    return findAll('foods',params)
  }


 module.exports= {getAllfoods}