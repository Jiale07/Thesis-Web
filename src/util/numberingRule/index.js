/*
    编号规则：
    设计理念：以前端处理规则逻辑为主，后端配置存储规则内容，以配置项的方式，匹配对应类型的编号规则
 */

const NumberingType = {
    StudentID: 1,
    TeacherID: 2,
    AdminID: 3,
}

const NumberingRuleTypeName = {
    [NumberingType.StudentID]: '学号',
    [NumberingType.TeacherID]: '教职工号',
    [NumberingType.AdminID]: '管理员编号',
}

const NumberingTypeRuleFullName = {
    [NumberingType.StudentID]: '学生学号',
    [NumberingType.TeacherID]: '教师职工号',
    [NumberingType.AdminID]: '管理员编号',
}

// 编号规则
/*
    学生：入学年份、学院、专业、班级、流水号
    教师：入职年份、学院、流水号
    管理员：创建日期、流水号

    日期、选项、填写（固定编码、流水号。其中流水号需要填写最大位数、起始号），
 */
// function generateNumbering(numberingRuleType) {
//     // 校验编号
// }

export {
    NumberingType,
    NumberingRuleTypeName,
    NumberingTypeRuleFullName,
    // generateNumber,
}
