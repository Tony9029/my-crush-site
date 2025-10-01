export type Topic = {
  label: string;
  emoji: string;
  letters: string[];
};

// 🌷 24 chủ đề × 5 lá thư mẫu (ngắn gọn để bé dễ thay thế)
export const TOPICS: Record<string, Topic> = {
  notgood: {
    label: "Lúc cảm thấy bản thân không đủ giỏi",
    emoji: "🌱",
    letters: [
      "Đôi khi bé thấy mình chưa đủ giỏi, nhưng sự thật là bé đang tiến bộ từng ngày.",
      "bé không cần trở thành người giỏi nhất, chỉ cần là phiên bản tốt hơn của chính mình.",
      "Mỗi nỗ lực nhỏ bé bỏ ra hôm nay đều sẽ nở hoa trong tương lai.",
      "Người khác có thể đi nhanh hơn, nhưng con đường của bé vẫn đáng quý.",
      "bé đã mạnh mẽ hơn bé nghĩ nhiều rồi.",
    ],
  },
  notlucky: {
    label: "Lúc cảm thấy không đủ may mắn",
    emoji: "🍀",
    letters: [
      "May mắn không phải lúc nào cũng đến, nhưng nỗ lực của bé chưa từng vô ích.",
      "bé vẫn có những khoảnh khắc nhỏ bé đáng trân trọng quanh mình.",
      "May mắn sẽ tìm đến người kiên trì, và bé chính là một trong số đó.",
      "Mỗi ngày mới đều là một cơ hội để bé thử lại từ đầu.",
      "Một ngày nào đó, bé sẽ mỉm cười và thấy mình đã may mắn biết bao.",
    ],
  },
  tired: {
    label: "Lúc cảm thấy mệt mỏi",
    emoji: "😴",
    letters: [
      "Mệt mỏi chỉ là dấu hiệu rằng bé đã cố gắng rất nhiều.",
      "Hãy cho bản thân được nghỉ ngơi, bé xứng đáng lắm.",
      "Một giấc ngủ ngon sẽ giúp bé hồi phục và mạnh mẽ hơn.",
      "Đừng tự trách, bé đã làm tốt hơn bé nghĩ.",
      "Ngày mai sẽ lại là một ngày tươi sáng hơn cho bé.",
    ],
  },
  nottrusted: {
    label: "Lúc cảm thấy không được tin tưởng",
    emoji: "🤝",
    letters: [
      "Khi ai đó không tin bé, điều đó không có nghĩa là bé vô giá trị.",
      "bé hiểu rõ chính mình, và đó là niềm tin quan trọng nhất.",
      "Thời gian sẽ chứng minh sự chân thành và nỗ lực của bé.",
      "Đừng để sự nghi ngờ của người khác làm mờ đi ánh sáng của bé.",
      "Luôn tin vào chính mình, vì bé xứng đáng được tin tưởng.",
    ],
  },
  selfdoubt: {
    label: "Lúc hoài nghi về chính mình",
    emoji: "🪞",
    letters: [
      "Đôi khi bé hoài nghi, nhưng hãy nhớ bé đã đi xa đến nhường nào.",
      "Những gì bé đang cảm thấy không định nghĩa con người bé.",
      "bé xứng đáng được yêu thương, ngay cả khi bé chưa hoàn hảo.",
      "Hoài nghi chỉ là bước đệm để bé tìm lại niềm tin.",
      "bé đang làm tốt hơn bé nghĩ nhiều.",
    ],
  },
  late: {
    label: "Lúc thức khuya",
    emoji: "🌙",
    letters: [
      "Thức khuya không tốt cho sức khỏe đâu, bé nhỏ à.",
      "Ngày mai sẽ đẹp hơn nếu hôm nay bé ngủ sớm một chút.",
      "Một giấc ngủ ngon là món quà bé có thể tự tặng cho mình.",
      "Đêm dài dễ khiến bé suy nghĩ nhiều, nhưng sáng mai trời sẽ lại xanh.",
      "Ngủ sớm nhé, để mai thật rạng rỡ.",
    ],
  },
  skipmeal: {
    label: "Lúc lười ăn",
    emoji: "🍲",
    letters: [
      "Bỏ bữa sẽ làm bé thêm mệt mỏi, nhớ ăn một chút gì nhé.",
      "Một bữa ăn ngon cũng là cách tự yêu thương bản thân.",
      "Cơ thể bé cần năng lượng để tiếp tục hành trình.",
      "bé quan trọng, nên đừng để dạ dày trống rỗng.",
      "Ăn ngon miệng rồi bé sẽ thấy dễ chịu hơn nhiều.",
    ],
  },
  giveup: {
    label: "Lúc muốn bỏ cuộc",
    emoji: "🔥",
    letters: [
      "Đừng quên lý do bé bắt đầu, nó vẫn ở đó chờ bé.",
      "Khó khăn chỉ là bước đệm để bé trưởng thành hơn.",
      "bé đã đi xa thế này rồi, đừng dừng lại nhé.",
      "Một bước nhỏ vẫn đưa bé về phía trước.",
      "Tin rằng bé đủ mạnh mẽ để tiếp tục.",
    ],
  },
  lonely: {
    label: "Lúc thấy cô đơn, trống rỗng",
    emoji: "💌",
    letters: [
      "Cô đơn không có nghĩa là bé một mình.",
      "bé luôn đáng được yêu thương và trân trọng.",
      "Có những người quan tâm bé nhiều hơn bé nghĩ.",
      "Dù cảm thấy trống rỗng, bé vẫn có giá trị vô cùng.",
      "bé chưa bao giờ là vô hình trong thế giới này.",
    ],
  },
  rejection: {
    label: "Lúc bị từ chối/thất bại",
    emoji: "📉",
    letters: [
      "Một lần bị từ chối không định nghĩa giá trị của bé.",
      "Thất bại chỉ là một phần trong hành trình đi đến thành công.",
      "bé còn nhiều cơ hội khác ở phía trước.",
      "Đừng tự trách, hãy tự hào vì bé đã dám thử.",
      "bé vẫn đáng yêu và giá trị như trước.",
    ],
  },
  pressure: {
    label: "Lúc áp lực học tập/công việc",
    emoji: "📚",
    letters: [
      "Áp lực chứng tỏ rằng bé đang tiến về phía trước.",
      "bé không cần phải hoàn hảo, chỉ cần cố gắng hết mình.",
      "Hãy cho mình chút thời gian để nghỉ ngơi.",
      "Mọi việc sẽ ổn khi bé chia nhỏ và giải quyết dần.",
      "Tin rằng bé làm được, vì bé đã rất kiên cường.",
    ],
  },
  conflict: {
    label: "Lúc xích mích với người thân/bé bè",
    emoji: "🫂",
    letters: [
      "Một cuộc xích mích không thể xóa hết tình cảm đâu.",
      "Một lời xin lỗi hoặc sự cảm thông sẽ chữa lành rất nhiều.",
      "Hãy cho nhau thời gian để nguôi giận.",
      "Đừng quên bé đã từng quan trọng với nhau thế nào.",
      "Tình thương rồi sẽ vượt qua giận dỗi.",
    ],
  },
  homesick: {
    label: "Lúc nhớ nhà/nhớ người quan trọng",
    emoji: "🏡",
    letters: [
      "Nhớ nhà là vì nơi đó chứa đựng yêu thương.",
      "Khoảng cách không làm giảm đi tình cảm đâu.",
      "bé luôn mang một phần của ngôi nhà trong tim.",
      "Người bé nhớ cũng đang nhớ bé nhiều lắm.",
      "Một ngày gần thôi, bé sẽ được đoàn tụ.",
    ],
  },
  waiting: {
    label: "Lúc chờ kết quả quan trọng",
    emoji: "⏳",
    letters: [
      "Chờ đợi thật dài, nhưng bé đã làm hết sức rồi.",
      "Kết quả không thể thay đổi giá trị của bé.",
      "Hãy để lòng mình nhẹ nhõm trong lúc chờ đợi.",
      "Dù kết quả ra sao, bé vẫn xứng đáng được tự hào.",
      "Điều tốt đẹp rồi sẽ đến với bé.",
    ],
  },
  compare: {
    label: "Lúc tự so sánh với người khác",
    emoji: "⚖️",
    letters: [
      "So sánh chỉ khiến bé quên đi giá trị thật của mình.",
      "bé có hành trình riêng mà không ai có thể thay thế.",
      "Mỗi người đều có thời điểm nở hoa khác nhau.",
      "Hãy tập trung vào sự tiến bộ của chính mình.",
      "bé đã đủ tuyệt vời rồi.",
    ],
  },
  misunderstood: {
    label: "Lúc thấy không ai hiểu mình",
    emoji: "🌀",
    letters: [
      "Không ai có thể hiểu bé 100%, nhưng điều đó không sao.",
      "Sẽ có người thật sự muốn lắng nghe bé.",
      "bé có quyền chia sẻ nỗi lòng của mình.",
      "Một ngày nào đó, bé sẽ gặp người thấu hiểu bé.",
      "Trong lúc này, hãy tin rằng bé vẫn xứng đáng với yêu thương.",
    ],
  },
  sick: {
    label: "Lúc ốm/không khỏe",
    emoji: "🤒",
    letters: [
      "bé cần được nghỉ ngơi thật nhiều lúc này.",
      "Đừng quên uống nước và ăn uống đầy đủ nhé.",
      "Cơ thể bé cần sự dịu dàng từ chính bé.",
      "Mệt mỏi sẽ qua đi, bé sẽ khỏe lại thôi.",
      "Giữ sức khỏe vì bé rất quan trọng.",
    ],
  },
  badluck: {
    label: "Lúc gặp xui xẻo liên tiếp",
    emoji: "☔",
    letters: [
      "Ngày xui xẻo nào rồi cũng sẽ qua thôi.",
      "Đừng để vài chuyện nhỏ làm mất niềm tin của bé.",
      "bé vẫn còn nhiều cơ hội tốt ở phía trước.",
      "Hãy coi đây như thử thách để bé mạnh mẽ hơn.",
      "Trời sẽ lại sáng sau cơn mưa.",
    ],
  },
  argument: {
    label: "Lúc sau tranh cãi/tổn thương",
    emoji: "💔",
    letters: [
      "Tranh cãi không có nghĩa là mất đi tình cảm.",
      "Tổn thương rồi cũng sẽ lành nếu có sự cảm thông.",
      "Một lời xin lỗi chân thành có thể chữa lành nhiều điều.",
      "Hãy cho nhau cơ hội để hiểu nhau hơn.",
      "bé xứng đáng với kết nối dịu dàng.",
    ],
  },
  cantcry: {
    label: "Lúc muốn khóc mà không khóc được",
    emoji: "🌧️",
    letters: [
      "Không khóc không có nghĩa là bé không đau.",
      "bé có quyền yếu đuối, có quyền cảm xúc.",
      "Hãy tìm một cách khác để trút bầu tâm sự.",
      "Nước mắt có thể đến muộn, nhưng cảm xúc vẫn thật.",
      "Rồi bé sẽ thấy nhẹ nhõm hơn nhiều.",
    ],
  },
  lost: {
    label: "Lúc mất phương hướng",
    emoji: "🧭",
    letters: [
      "Ai cũng có lúc không biết phải đi đâu.",
      "Mất phương hướng chỉ là tạm thời thôi.",
      "bé có thể dừng lại và lắng nghe chính mình.",
      "Rồi bé sẽ tìm thấy con đường phù hợp.",
      "Tin rằng bé sẽ ổn thôi.",
    ],
  },
  smallwin: {
    label: "Lúc có thành công nhỏ",
    emoji: "🎉",
    letters: [
      "Chúc mừng bé vì bước tiến nhỏ này!",
      "Mỗi thành công đều đáng để ăn mừng.",
      "Đừng coi nhẹ điều bé vừa đạt được.",
      "Hãy tự hào về chính mình nhiều hơn.",
      "bé xứng đáng với niềm vui này.",
    ],
  },
  fear: {
    label: "Lúc sợ điều sắp tới",
    emoji: "📣",
    letters: [
      "Nỗi sợ là bình thường, ai cũng có.",
      "bé mạnh mẽ hơn bé nghĩ nhiều.",
      "Hãy hít sâu và tin vào chính mình.",
      "Mọi thử thách rồi sẽ qua.",
      "bé sẽ làm được thôi, tin ở bé.",
    ],
  },
  unimportant: {
    label: "Lúc thấy mình không quan trọng",
    emoji: "💖",
    letters: [
      "bé quan trọng hơn bé nghĩ nhiều lắm.",
      "Thế giới này may mắn vì có bé.",
      "bé là nguồn sáng trong mắt ai đó.",
      "bé xứng đáng với tình yêu thương dịu dàng.",
      "bé chưa bao giờ là không quan trọng cả.",
    ],
  },
};
