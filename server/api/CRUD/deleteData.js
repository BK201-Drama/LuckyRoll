// 运用主键id和次数number来多次删除
// 用于突然升高概率之后再复原概率用
const deleteStudent = (id, number) => {
  Models.SelfFilledEvent.deleteMany({
    studentMessage: id,
    id: number
  })
  .then(() => {
    console.log("删除成功")
  })
}