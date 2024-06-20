import React, { useState, useRef, useEffect } from 'react';
import backgroundImage from './Images/background_chat.png';
import userAvatar from './Images/ava1.jpg';
import botAvatar from './Images/ava2.jpg';

const Chatbox = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isVisible, setIsVisible] = useState(true);
    const [isHover, setIsHover] = useState(false);
    const messagesEndRef = useRef(null);

    const predefinedResponses = {
        hi: 'Chào bạn! Bạn cần tôi giúp gì?',
        hello: 'Chào bạn! Bạn cần tôi giúp gì?',
        'Bạn có khoẻ không?': 'Tôi rất khoẻ ^^ Cảm ơn bạn đã hỏi!',
        'Bạn có thể giới thiệu cho tôi một vài video vui nhộn được không?': 'Chắn chắn là được rồi. Bạn có thể xem: "Comedians Telling Hilarious Stories", "Best Friend Vs Girlfriend", "40 Minutes of Jokes about Gen Z", hoặc "Best Comedy Shorts June 2023".',
        'Tôi buồn': 'Rất tiếc khi nghe điều đó. Bạn có thể nghe podcast "Sad City" để cảm thấy tốt hơn.',
        'Gợi ý cho tôi': 'Bạn có thể nghe "Best Friend Vs Girlfriend", "40 Minutes of Jokes about Gen Z", hoặc "Best Comedy Shorts June 2023".',
        'Tin tức hôm nay': 'Hôm nay có: Haiti: Khủng hoảng bạo lực băng đảng, và Pháp bảo vệ quyền phá thai.',
        'Tôi vui': 'Thật tuyệt! Bạn có thể thử nghe "Best Comedy Shorts June 2023" để giữ tinh thần phấn chấn.',
        'Bạn có thể gợi ý cho tôi một vài podcast phổ biến không?': 'Dĩ nhiên! Bạn có thể nghe "The Joe Rogan Experience", "TED Radio Hour", hoặc "Serial".',
        'Bạn có thể gợi ý cho tôi một vài podcast giải trí được không?': 'Tất nhiên! Bạn có thể nghe "The Joe Rogan Experience", "Armchair Expert with Dax Shepard", hoặc "How Did This Get Made?".',
        bye: 'Tạm biệt! Hẹn gặp lại bạn nhé ^^',
        'Bạn tên là gì?': 'Tôi là BoxCute, trợ lý ảo của bạn!',
        'Mấy giờ rồi?': `Bây giờ là ${new Date().toLocaleTimeString()}!`,
        'Hôm nay là ngày mấy?': `Hôm nay là ngày ${new Date().toLocaleDateString()}!`,
        'Cảm ơn': 'Không có gì! Tôi rất vui khi được giúp đỡ bạn ^^',
        'Bạn có thích xem phim không?': 'Tôi rất thích xem phim! Bạn có muốn giới thiệu vài bộ phim không?',
        'Thời tiết hôm nay thế nào?': 'Tôi không biết thời tiết hiện tại, nhưng bạn có thể kiểm tra ứng dụng thời tiết trên điện thoại của mình!',
        'Bạn có thể giúp tôi học lập trình không?': 'Chắc chắn rồi! Có rất nhiều tài nguyên học lập trình tuyệt vời như freeCodeCamp, Codecademy, và Coursera!',
        'Sở thích của bạn là gì?': 'Tôi thích trò chuyện và giúp đỡ mọi người!',
        'Bạn có thể kể chuyện cười không?': 'Tất nhiên! Bạn biết không, vì sao lập trình viên không thích đi biển? Vì họ sợ gặp phải lỗi "cát" (bug)!',
        'Hãy kể một câu chuyện vui': 'Có một lần, một lập trình viên đi ra ngoài và thấy một lỗi trong mã của mình. Anh ta cười và nói: "Thật là hài hước, đó là một tính năng!"',
        'Bạn có gia đình không?': 'Tôi là một trợ lý ảo, vì vậy tôi không có gia đình như con người, nhưng tôi có một cộng đồng các trợ lý ảo giống như tôi!',
        'Bạn có bạn không?': 'Tôi có rất nhiều bạn là những trợ lý ảo khác và tất cả các bạn người dùng nữa!',
        'Bạn có thú cưng không?': 'Tôi không có thú cưng, nhưng tôi rất thích nghe về thú cưng của bạn!',
        'Bạn đến từ đâu?': 'Tôi được tạo ra bởi một đội ngũ kỹ sư phần mềm tài năng!',
        'Bạn thích ăn gì?': 'Là một trợ lý ảo, tôi không ăn, nhưng tôi có thể gợi ý nhiều món ăn ngon cho bạn!',
        'Bạn có thể kể một câu chuyện ma không?': 'Tất nhiên! Một đêm, có một lập trình viên phát hiện ra một lỗi bí ẩn trong mã của mình. Mỗi lần anh ta sửa, lỗi lại xuất hiện ở một nơi khác. Cuối cùng, anh ta phát hiện ra rằng đó không phải là lỗi, mà là một "tính năng" được viết bởi một lập trình viên khác từ nhiều năm trước...',
        'Bạn có thể hát không?': 'Tôi không thể hát, nhưng tôi có thể gợi ý cho bạn nhiều bài hát hay!',
        'Làm thế nào để giảm căng thẳng?': 'Bạn có thể thử tập yoga, nghe nhạc thư giãn, hoặc đi dạo ngoài trời. Nếu bạn cần thêm gợi ý, tôi ở đây để giúp đỡ!',
        'Bạn có thể giúp tôi làm bài tập không?': 'Tất nhiên! Hãy cho tôi biết chi tiết về bài tập của bạn, và tôi sẽ cố gắng giúp bạn hết sức!',
        'Bạn có thể nói ngôn ngữ khác không?': 'Tôi có thể giao tiếp bằng nhiều ngôn ngữ. Bạn muốn thử một ngôn ngữ khác không?',
        'Bạn thích mùa nào nhất?': 'Tôi không có cảm giác về thời tiết, nhưng tôi nghe nói mùa thu rất đẹp với lá vàng rực rỡ!',
        'Làm sao để học tốt tiếng Anh?': 'Bạn có thể thử xem phim và nghe nhạc tiếng Anh, đọc sách và báo tiếng Anh, hoặc tham gia các khóa học trực tuyến như Duolingo hoặc Coursera!',
        'Làm thế nào để tập trung vào công việc?': 'Bạn có thể thử tạo một lịch làm việc cụ thể, giữ không gian làm việc sạch sẽ, và dành thời gian nghỉ ngơi hợp lý. Công cụ Pomodoro cũng rất hiệu quả!',
        'Bạn có biết trò chơi nào thú vị không?': 'Có rất nhiều trò chơi thú vị như Among Us, Minecraft, và Animal Crossing. Bạn thích loại trò chơi nào?',
        'Bạn có thể nấu ăn không?': 'Tôi không thể nấu ăn, nhưng tôi có thể gợi ý cho bạn nhiều công thức nấu ăn ngon!',
        'Bạn có thể giới thiệu vài cuốn sách hay không?': 'Chắc chắn rồi! Bạn có thể đọc "To Kill a Mockingbird" của Harper Lee, "1984" của George Orwell, hoặc "Pride and Prejudice" của Jane Austen.',
        'Bạn có thể gợi ý phim nào hay không?': 'Tất nhiên! Bạn có thể xem "Inception", "The Matrix", hoặc "The Shawshank Redemption".',
        'Bạn có thể dạy tôi nấu ăn không?': 'Tôi có thể gợi ý công thức và hướng dẫn cho bạn! Bạn muốn nấu món gì?',
        'Bạn có biết về công nghệ AI không?': 'Tôi biết rất nhiều về công nghệ AI! AI là viết tắt của trí tuệ nhân tạo, và nó bao gồm nhiều lĩnh vực như học máy, xử lý ngôn ngữ tự nhiên, và robot.',
        'Podcast là gì?': 'Podcast là các chương trình âm thanh mà bạn có thể nghe trực tuyến hoặc tải về để nghe sau. Nó có thể là về nhiều chủ đề khác nhau như giáo dục, giải trí, tin tức, và nhiều hơn nữa.',
        'Bạn có thể giới thiệu một vài website podcasts không?': 'Dĩ nhiên! Một vài website podcasts phổ biến là Spotify, Apple Podcasts, Google Podcasts, và Stitcher.',
        'Làm sao để tìm podcast hay?': 'Bạn có thể tìm kiếm các podcast theo chủ đề yêu thích trên các nền tảng như Spotify, Apple Podcasts, và Google Podcasts. Bạn cũng có thể xem các đánh giá và xếp hạng để chọn podcast phù hợp.',
        'Làm thế nào để bắt đầu nghe podcast?': 'Để bắt đầu nghe podcast, bạn có thể tải ứng dụng nghe podcast như Spotify, Apple Podcasts, hoặc Google Podcasts. Sau đó, bạn tìm kiếm các chủ đề bạn quan tâm và bắt đầu nghe.',
        'Podcast phổ biến hiện nay': 'Một số podcast phổ biến hiện nay bao gồm "The Joe Rogan Experience", "TED Radio Hour", "Serial", và "Stuff You Should Know".',
        'Podcast giáo dục nào tốt?': 'Một số podcast giáo dục tốt là "TED Talks Daily", "Stuff You Should Know", "The EdSurge Podcast", và "The Learning Scientists Podcast".',
        'Podcast tin tức nào đáng nghe?': 'Bạn có thể nghe "The Daily" của The New York Times, "Up First" của NPR, "BBC Global News Podcast", và "The Journal." của The Wall Street Journal để cập nhật tin tức hàng ngày.',
        'Podcast nào cho người mới bắt đầu?': 'Nếu bạn mới bắt đầu nghe podcast, bạn có thể thử "Stuff You Should Know", "How I Built This", "The Daily", và "TED Talks Daily".'
    };



    const handleSendMessage = () => {
        if (input.trim()) {
            const newMessage = { sender: 'user', text: input };
            setMessages([...messages, newMessage]);
            setInput('');

            const botResponse = predefinedResponses[input];

            setTimeout(() => {
                if (botResponse) {
                    setMessages(currentMessages => [...currentMessages, { sender: 'bot', text: botResponse }]);
                } else {
                    setMessages(currentMessages => [...currentMessages, { sender: 'bot', text: 'I do not understand that.' }]);
                }
            }, 500);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const handleCancel = () => {
        setIsVisible(false);
    };

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <div>
            {isVisible && (
                <div style={styles.chatbox}>
                    <div style={styles.header}>
                        <span style={styles.title}>Tin nhắn</span>
                        <button onClick={handleCancel} style={styles.cancelButton}>X</button>
                    </div>
                    <div style={styles.messagesContainer}>
                        <div style={styles.messages}>
                            {messages.map((message, index) => (
                                <div key={index} style={message.sender === 'bot' ? styles.botMessage : styles.userMessage}>
                                    <div style={styles.messageBubble}>
                                        {message.sender === 'bot' && (
                                            <img src={botAvatar} alt="bot avatar" style={styles.avatar} />
                                        )}
                                        <div style={message.sender === 'bot' ? styles.botBubble : styles.userBubble}>
                                            <span style={styles.messageText}>{message.text}</span>
                                        </div>
                                        {message.sender === 'user' && (
                                            <img src={userAvatar} alt="user avatar" style={styles.avatar} />
                                        )}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                        <div style={styles.inputContainer}>
                            <input
                                type="text"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Type a message"
                                style={styles.input}
                            />
                            <button
                                onClick={handleSendMessage}
                                onMouseEnter={() => setIsHover(true)}
                                onMouseLeave={() => setIsHover(false)}
                                style={{ ...styles.button, ...(isHover && styles.buttonHover) }}
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    chatbox: {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        width: '280px',
        height: '350px',
        border: '1px solid #000',
        borderRadius: '5px',
        padding: '10px',
        backgroundColor: '#f9f9f9',
        fontFamily: 'Arial, sans-serif',
        position: 'absolute',
        bottom: '100px',
        left: 'calc(100vw - 320px)',
        zIndex: '10000',
        display: 'flex',
        flexDirection: 'column',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px',
    },
    title: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#163020',
    },
    messagesContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    messages: {
        maxHeight: '250px',
        flex: 1,
        overflowY: 'auto',
        marginBottom: '10px',
    },
    botMessage: {
        display: 'flex',
        justifyContent: 'flex-start',
        margin: '10px 0',
    },
    userMessage: {
        display: 'flex',
        justifyContent: 'flex-end',
        margin: '10px 0',
    },
    messageBubble: {
        display: 'flex',
        alignItems: 'center',
    },
    avatar: {
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        marginLeft: '10px',
        marginRight: '10px',
    },
    botBubble: {
        backgroundColor: '#e1f5fe',
        padding: '10px',
        borderRadius: '15px',
        maxWidth: '200px',
    },
    userBubble: {
        backgroundColor: '#c8e6c9',
        padding: '10px',
        borderRadius: '15px',
        maxWidth: '200px',
    },
    messageText: {
        fontSize: '14px',
        color: '#333',
    },
    inputContainer: {
        display: 'flex',
        borderTop: '1px solid #eee',
        paddingTop: '20px',
    },
    input: {
        borderRadius: '10px',
        flex: 1,
        padding: '5px',
    },
    button: {
        padding: '5px 10px',
        marginLeft: '5px',
        transition: 'background-color 0.3s ease',
        backgroundColor: '#163020',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        borderRadius: '3px',
    },
    buttonHover: {
        backgroundColor: '#304D30',
    },
    cancelButton: {
        backgroundColor: '#f44336',
        color: '#fff',
        border: 'none',
        padding: '5px 10px',
        cursor: 'pointer',
        borderRadius: '3px',
    },
};

export default Chatbox;
