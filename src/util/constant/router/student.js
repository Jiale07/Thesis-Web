const StudentRouterEnum = {
  StudentHomeView: Symbol(),
  ChooseInstructor: Symbol(),

  ThesisProposal: Symbol(),
  ThesisView: Symbol(),
  ThesisSubmitView: Symbol(),
  ThesisDetailView: Symbol(),
  ThesisFinalSubmitView: Symbol(),
  ThesisFinalView: Symbol(),
}
const StudentRouterName = {
  [StudentRouterEnum.StudentHomeView]: 'StudentHomeView',
  [StudentRouterEnum.ChooseInstructor]: 'ChooseInstructor',
  [StudentRouterEnum.ThesisProposal]: 'ThesisProposal',
  [StudentRouterEnum.ThesisView]: 'ThesisView',
  [StudentRouterEnum.ThesisSubmitView]: 'ThesisSubmitView',
  [StudentRouterEnum.ThesisDetailView]: 'ThesisDetailView',
  [StudentRouterEnum.ThesisFinalSubmitView]: 'ThesisFinalSubmitView',
  [StudentRouterEnum.ThesisFinalView]: 'ThesisFinalView',
}
const StudentRouterPage = {
  [StudentRouterEnum.StudentHomeView]: '/student',
  [StudentRouterEnum.ChooseInstructor]: '/chooseInstructor',
  [StudentRouterEnum.ThesisProposal]: '/thesisProposal',
  [StudentRouterEnum.ThesisView]: '/thesisView',
  [StudentRouterEnum.ThesisSubmitView]: '/thesisSubmitView',
  [StudentRouterEnum.ThesisDetailView]: '/thesisDetailView',
  [StudentRouterEnum.ThesisFinalSubmitView]: '/thesisFinalSubmitView',
  [StudentRouterEnum.ThesisFinalView]: '/thesisFinalView',
}
const StudentPageName = {
  [StudentRouterEnum.StudentHomeView]: '学生页面',
  [StudentRouterEnum.ChooseInstructor]: '毕业设计双向选择',
  [StudentRouterEnum.ThesisProposal]: '提交开题报告',
  [StudentRouterEnum.ThesisView]: '毕业设计论文',
  [StudentRouterEnum.ThesisSubmitView]: '提交毕业设计论文',
  [StudentRouterEnum.ThesisDetailView]: '毕业设计论文详情',
  [StudentRouterEnum.ThesisFinalSubmitView]: '提交毕业设计论文(最终版）',
  [StudentRouterEnum.ThesisFinalView]: '毕业设计论文提交记录(最终版）',
}


export {
  StudentRouterEnum,
  StudentRouterName,
  StudentRouterPage,
  StudentPageName
}

