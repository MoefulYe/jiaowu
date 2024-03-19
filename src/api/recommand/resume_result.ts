import { useStateStore } from '@/stores/user-state'
import type { Job } from '../jobs'
import service from '@/util/requests'
export type Skill = string

export type MatchResult = {
  direction: Job
  matchedSkills: Skill[]
  shortboardSkills: Skill[]
  score: number
  interpretation: string
}[]

export const enum ResumeResultState {
  unfulfill,
  ambiguity,
  match
}

export type ResumeResult =
  | [ResumeResultState.unfulfill]
  | [ResumeResultState.ambiguity, Job[]]
  | [ResumeResultState.match, MatchResult]

export const fetchResumeResult = async (): Promise<ResumeResult> => {
  const state = useStateStore()
  state.fetchResume()
  if (state.resume!.skills.length === 0) {
    return [ResumeResultState.unfulfill]
  } else if (state.resume!.directions.length === 0) {
    const jobs = (await service.get('/recommend/position/ambiguity')) as Job[]
    return [ResumeResultState.ambiguity, jobs]
  } else {
    // const result = await service.get('/recommend/position/match',{
    //   timeout: 10 * 60 * 1000
    // }) as MatchResult
    const result = [
      {
        direction: '前端',
        matchedSkills: ['vue'],
        score: 0.7,
        shortboardSkills: ['react', 'js', 'html'],
        interpretation:
          '当然可以。以下是学习React，JavaScript (特别是ES6/ES7) 以及HTML的建议：\n\n1. 基础知识的学习：学习基础的编程和数据结构。JavaScript基础非常重要，如变量，数据类型，条件语句，循环等等。ES6和ES7是现代JavaScript的基础，可以更简洁和有效地编程。同时了解基本的HTML标签以及如何通过CSS创建网页的样式也是必要的。\n2. 理解React：React是一个用于构建用户界面的JavaScript库。学习React需要理解其核心概念，如组件，状态，props等。同时，理解React的虚拟DOM和Reconciliation过程也是非常重要的。\n3. 实践：理论学习是必要的，但实践同样重要。尝试创建一些小的React应用，这将帮助你更好地理解React的工作原理。\n4. 阅读文档：React和JavaScript的官方文档是学习的基础资源。通过阅读和理解这些文档，你可以了解更多细节和最佳实践。\n5. 学习社区资源：网络上有很多学习资源，例如在线课程，博客文章，论坛讨论等。参与社区讨论，阅读他人的问题和答案，也可以帮助你学习新的知识和技能。\n6. 做项目：只有理论知识是不够的。通过参与项目实践，你可以更好地理解各种技术和概念如何在实际中应用。\n7. 持续学习：技术总是在不断发展和变化的。因此，持续学习并跟上最新进展是非常重要的。\n8. 利用在线工具和实践社区：有许多在线工具和平台可以帮助你学习和练习React、JavaScript和HTML的知识，例如CodePen、Repl.it等。此外，一些在线学习社区也是一个很好的资源，例如GitHub、Stack Overflow等。\n\n希望这些建议对你有所帮助！祝你学习愉快！'
      },
      {
        direction: '机器学习',
        matchedSkills: ['python'],
        score: 0.6,
        shortboardSkills: ['语音图像识别', 'c/c++', '自然语言处理'],
        interpretation:
          '学习语音图像识别、C/C++和自然语言处理是一个涉及多个领域和技术的复杂过程。以下是一些学习建议：\n\n1. 基础知识：首先，你需要掌握计算机科学的基础知识，如数据结构、算法、操作系统、网络等。这些基础知识将帮助你更好地理解更高级的技术。\n2. 编程语言：C/C++ 是进行底层开发或性能敏感的软件开发时的首选语言。你需要掌握这两种语言的基本语法、结构和工具。此外，你还需要学习一些用于数据结构和算法的编程语言，如Python。\n3. 图像识别和语音识别：这两个领域都有大量的资源和教程可供学习。你可以开始阅读和理解基础的机器学习和深度学习理论，如卷积神经网络（CNN）和循环神经网络（RNN）。对于语音识别，你需要了解声学模型和语音编码器，如声学回声模型（Acoustic Echo Model）。对于图像识别，理解卷积神经网络（CNN）和目标检测等任务的基础知识是很有帮助的。\n4. 自然语言处理：自然语言处理是一个非常广泛的领域，包括词性标注、命名实体识别、情感分析等许多任务。你需要了解基础的NLP理论，如词嵌入、转换器模型等。此外，你还需要熟悉一些用于NLP的库，如TensorFlow、PyTorch等。\n5. 实践项目：通过参与实际的项目来应用所学知识是非常重要的。你可以尝试自己实现一些简单的图像识别或语音识别系统，或者参与一些更大的项目，如语音助手或图像分类项目。\n6. 持续学习：这个领域的发展非常快，新的技术和方法不断涌现。你需要保持对新的研究和论文的关注，并定期更新你的知识和技能。\n7. 阅读源代码：阅读和理解优秀的源代码是提高技能的ææ¹å¼ãä½ å¯ä»¥å°è¯éè¯»åçè§£ä¸äºèåçæ·±åº¦å­¦ä¹ åºï¼å¦TensorFlowæPyTorchï¼çæºä»£ç ï¼æèæ¯ä¸äºèåçNLPæè®¡ç®æºè§è§é¡¹ç®çæºä»£ç ã\n8. åä¸ç¤¾åºï¼åä¸ç¸å³çç¤¾åºåè®ºåï¼å¦GitHubãStack OverflowãRedditç­ï¼å¯ä»¥è·å¾å¾å¤æç¨çå»ºè®®ååé¦ã\n9. å¨æå®è·µï¼çè®ºç¥è¯æ¯éè¦çï¼ä½å®è·µç»éªåæ ·éè¦ãå°è¯èªå·±ç¼åä¸äºå°çç¨åºæé¡¹ç®ï¼è¿å°å¸®å©ä½ æ´å¥½å°çè§£åææ¡è¿äºææ¯ã\n\nä»¥ä¸å°±æ¯ä¸äºå³äºå­¦ä¹ è¯­é³å¾åè¯å«ãC/C++åèªç¶è¯­è¨å¤ççå­¦ä¹ å»ºè®®ãè¯·è®°ä½ï¼å­¦ä¹ æ¯ä¸ä¸ªæç»­çè¿ç¨ï¼ä¸è¦æå¿ä¸å¼å§çä¸å®ç¾ï¼éçæ¶é´çæ¨ç§»ï¼ä½ ä¼éæ¸åå¾çç»çã'
      }
    ] as MatchResult
    result.forEach(item => {
      const interpretation = item.interpretation
      const idx = interpretation.indexOf('1.')
      if (idx !== -1) {
        item.interpretation = interpretation.slice(idx) 
      }
    })
    return [ResumeResultState.match, result]
  }
}
