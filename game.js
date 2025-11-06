
    // 问题数据
    const questions = [
    {
        id: 1,
    question: "足球比赛中，每队上场球员人数是多少？",
    options: ["8人", "10人", "11人", "12人"],
    correctAnswer: 2,
    points: 10,
    explanation: "足球比赛中，每队上场球员人数为11人，包括1名守门员。如果一方人数少于7人，比赛将终止。"
      },
    {
        id: 2,
    question: "奥运会每隔几年举办一次？",
    options: ["2年", "4年", "6年", "8年"],
    correctAnswer: 1,
    points: 10,
    explanation: "现代奥运会每4年举办一次，这一周期源于古代奥运会的传统。夏季奥运会和冬季奥运会现在交替每2年举办一次。"
      },
    {
        id: 3,
    question: "篮球比赛中，一个标准的篮球场长度是多少米？",
    options: ["26米", "28米", "30米", "32米"],
    correctAnswer: 1,
    points: 15,
    explanation: "国际篮联(FIBA)规定的标准篮球场长度为28米，宽度为15米。NBA球场略长，为28.65米。"
      },
    {
        id: 4,
    question: "网球四大满贯赛事不包括以下哪项？",
    options: ["温布尔登网球锦标赛", "美国网球公开赛", "法国网球公开赛", "中国网球公开赛"],
    correctAnswer: 3,
    points: 15,
    explanation: "网球四大满贯指的是澳大利亚网球公开赛、法国网球公开赛、温布尔登网球锦标赛和美国网球公开赛，它们是网球运动中最具影响力的赛事。"
      },
    {
        id: 5,
    question: "马拉松长跑的标准距离是多少？",
    options: ["40.195公里", "42.195公里", "45公里", "50公里"],
    correctAnswer: 1,
    points: 10,
    explanation: "马拉松的标准距离为42.195公里，这一距离源于1908年伦敦奥运会，当时为了让皇室成员能看到起点而特意延长了距离。"
      },
    {
        id: 6,
    question: "下列哪项运动被称为\"世界第一运动\"？",
    options: ["篮球", "足球", "网球", "田径"],
    correctAnswer: 1,
    points: 10,
    explanation: "足球被广泛认为是\"世界第一运动\"，因其全球影响力、参与人数和观众数量均居各项运动之首。"
      },
    {
        id: 7,
    question: "乒乓球起源于哪个国家？",
    options: ["中国", "英国", "日本", "瑞典"],
    correctAnswer: 1,
    points: 20,
    explanation: "乒乓球起源于19世纪末的英国，最初作为室内娱乐活动被称为\"桌上网球\"(table tennis)，后来逐渐发展为一项竞技运动。"
      },
    {
        id: 8,
    question: "羽毛球比赛中，一方连续得分称为？",
    options: ["连击", "轮次", "发球权", "赛点"],
    correctAnswer: 2,
    points: 15,
    explanation: "在羽毛球比赛中，获得发球权的一方才能得分，当一方连续赢得分数时，称为拥有发球权。现代羽毛球实行每球得分制。"
      }
    ];

    // 奖品数据
    const prizes = [
    {
        id: 1,
    name: "运动水壶",
    description: "实用的运动水壶，适合各类运动场合使用",
    pointsRequired: 50,
    image: "./image/水壶.jpg"
      },
    {
        id: 2,
    name: "运动背包",
    description: "轻便耐用的运动背包，容量适中",
    pointsRequired: 100,
        image: "./image/背包.jpg"
      },
    {
        id: 3,
    name: "运动手环",
    description: "智能运动手环，记录你的运动数据",
    pointsRequired: 200,
        iimage: "./image/手环.jpg"
      },
    {
        id: 4,
    name: "运动鞋",
    description: "专业运动鞋，提供良好的支撑和缓冲",
    pointsRequired: 300,
        image: "./image/鞋子.png"
      }
    ];

    // 用户数据
    let userData = {
        currentPoints: 0,
    answeredQuestions: [],
    redeemedPrizes: []
    };

    // DOM元素
    const homePage = document.getElementById('home-page');
    const gamePage = document.getElementById('game-page');
    const resultPage = document.getElementById('result-page');
    const prizesPage = document.getElementById('prizes-page');
    const redeemSuccessModal = document.getElementById('redeem-success');

    // 按钮
    const startGameBtn = document.getElementById('start-game');
    const quitGameBtn = document.getElementById('quit-game');
    const nextQuestionBtn = document.getElementById('next-question');
    const showPrizesBtn = document.getElementById('show-prizes');
    const backToGameBtn = document.getElementById('back-to-game');
    const homeBtn = document.getElementById('home-btn');
    const prizeBtn = document.getElementById('prize-btn');
    const closeRedeemBtn = document.getElementById('close-redeem');

    // 显示元素
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const currentQuestionNumber = document.getElementById('current-question-number');
    const totalQuestions = document.getElementById('total-questions');
    const currentPointsEl = document.getElementById('current-points');
    const gamePointsEl = document.getElementById('game-points');
    const prizePointsEl = document.getElementById('prize-points');
    const pointsEarnedEl = document.getElementById('points-earned');
    const correctAnswerEl = document.getElementById('correct-answer');
    const correctResult = document.getElementById('correct-result');
    const incorrectResult = document.getElementById('incorrect-result');
    const explanation = document.getElementById('explanation');
    const explanationText = document.getElementById('explanation-text');
    const redeemMessage = document.getElementById('redeem-message');
    const prizesContainer = document.getElementById('prizes-container');

    // 当前问题
    let currentQuestion = null;

    // 初始化
    function init() {
        // 从本地存储加载用户数据
        loadUserData();

    // 更新积分显示
    updatePointsDisplay();

    // 生成奖品列表
    renderPrizes();

    // 设置总问题数
    totalQuestions.textContent = questions.length;

    // 添加事件监听器
    startGameBtn.addEventListener('click', startGame);
    quitGameBtn.addEventListener('click', quitGame);
    nextQuestionBtn.addEventListener('click', loadNextQuestion);
    showPrizesBtn.addEventListener('click', showPrizes);
    backToGameBtn.addEventListener('click', showGame);
    homeBtn.addEventListener('click', quitGame);
    prizeBtn.addEventListener('click', showPrizes);
      closeRedeemBtn.addEventListener('click', () => {
        redeemSuccessModal.classList.add('hidden');
      });
    }

    // 加载用户数据
    function loadUserData() {
      const savedData = localStorage.getItem('sportsQuizUserData');
    if (savedData) {
        userData = JSON.parse(savedData);
      }
    }

    // 保存用户数据
    function saveUserData() {
        localStorage.setItem('sportsQuizUserData', JSON.stringify(userData));
    }

    // 更新积分显示
    function updatePointsDisplay() {
        currentPointsEl.textContent = userData.currentPoints;
    gamePointsEl.textContent = userData.currentPoints;
    prizePointsEl.textContent = userData.currentPoints;
    }

    // 开始游戏
    function startGame() {
        homePage.classList.add('hidden');
    gamePage.classList.remove('hidden');
    homeBtn.classList.remove('hidden');
    prizeBtn.classList.remove('hidden');
    loadNextQuestion();
    }

    // 退出游戏
    function quitGame() {
        gamePage.classList.add('hidden');
    resultPage.classList.add('hidden');
    prizesPage.classList.add('hidden');
    homePage.classList.remove('hidden');
    homeBtn.classList.add('hidden');
    prizeBtn.classList.add('hidden');
    }

    // 显示奖品页面
    function showPrizes() {
        gamePage.classList.add('hidden');
    resultPage.classList.add('hidden');
    prizesPage.classList.remove('hidden');
    renderPrizes(); // 刷新奖品状态
    }

    // 显示游戏页面
    function showGame() {
        prizesPage.classList.add('hidden');
    resultPage.classList.add('hidden');
    gamePage.classList.remove('hidden');
    }

    // 加载下一个问题
    function loadNextQuestion() {
        // 隐藏结果页，显示游戏页
        resultPage.classList.add('hidden');
    gamePage.classList.remove('hidden');

    // 清空选项容器
    optionsContainer.innerHTML = '';

      // 找到未回答的问题
      const unansweredQuestions = questions.filter(q =>
    !userData.answeredQuestions.includes(q.id)
    );

    // 如果所有问题都已回答，重置已回答问题列表
    if (unansweredQuestions.length === 0) {
        userData.answeredQuestions = [];
    saveUserData();
    loadNextQuestion();
    return;
      }

    // 随机选择一个未回答的问题
    const randomIndex = Math.floor(Math.random() * unansweredQuestions.length);
    currentQuestion = unansweredQuestions[randomIndex];

    // 更新问题显示
    questionText.textContent = currentQuestion.question;

    // 更新当前问题编号
    currentQuestionNumber.textContent = userData.answeredQuestions.length + 1;

      // 创建选项按钮
      currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
    button.className = 'option-btn';
    button.textContent = option;
        button.addEventListener('click', () => checkAnswer(index));
    optionsContainer.appendChild(button);
      });
    }

    // 检查答案
    function checkAnswer(selectedIndex) {
      // 禁用所有选项按钮
      const optionButtons = optionsContainer.querySelectorAll('button');
      optionButtons.forEach(btn => btn.disabled = true);

    // 显示正确或错误结果
    if (selectedIndex === currentQuestion.correctAnswer) {
        // 正确答案
        optionButtons[selectedIndex].classList.add('bg-secondary-light', 'border-secondary');
    correctResult.classList.remove('hidden');
    incorrectResult.classList.add('hidden');
    pointsEarnedEl.textContent = currentQuestion.points;

    // 增加积分
    userData.currentPoints += currentQuestion.points;
      } else {
        // 错误答案
        optionButtons[selectedIndex].classList.add('bg-danger-light', 'border-danger');
    optionButtons[currentQuestion.correctAnswer].classList.add('bg-secondary-light', 'border-secondary');
    correctResult.classList.add('hidden');
    incorrectResult.classList.remove('hidden');
    correctAnswerEl.textContent = currentQuestion.options[currentQuestion.correctAnswer];
      }

    // 显示解释（如果有）
    if (currentQuestion.explanation) {
        explanationText.textContent = currentQuestion.explanation;
    explanation.classList.remove('hidden');
      } else {
        explanation.classList.add('hidden');
      }

    // 记录已回答的问题
    userData.answeredQuestions.push(currentQuestion.id);

    // 保存用户数据并更新积分显示
    saveUserData();
    updatePointsDisplay();

      // 显示结果页
      setTimeout(() => {
        gamePage.classList.add('hidden');
    resultPage.classList.remove('hidden');
      }, 1000);
    }

    // 渲染奖品列表
    function renderPrizes() {
        prizesContainer.innerHTML = '';
      
      prizes.forEach(prize => {
        const isRedeemed = userData.redeemedPrizes.includes(prize.id);
        const canRedeem = userData.currentPoints >= prize.pointsRequired && !isRedeemed;

    const prizeCard = document.createElement('div');
    prizeCard.className = 'prize-card';

    let btnClass = 'redeem-btn';
    let btnText = '兑换';
    let btnDisabled = false;
    let btnTitle = '';

    if (isRedeemed) {
        btnClass += ' bg-gray-200 text-gray-500 cursor-not-allowed';
    btnText = '已兑换';
    btnDisabled = true;
        } else if (canRedeem) {
        btnClass += ' bg-primary text-white hover:bg-primary/90';
        } else {
        btnClass += ' bg-gray-200 text-gray-500 cursor-not-allowed';
    btnDisabled = true;
    btnTitle = '积分不足';
        }

    prizeCard.innerHTML = `
    <img src="${prize.image}" alt="${prize.name}" class="prize-image">
        <div class="prize-info">
            <h3 class="prize-name">${prize.name}</h3>
            <p class="prize-description">${prize.description}</p>
            <div class="prize-footer">
                <span class="prize-points">
                    <i class="fa fa-trophy mr-1"></i>${prize.pointsRequired}积分
                </span>
                <button class="${btnClass}" data-prize-id="${prize.id}" ${btnDisabled ? 'disabled' : ''} ${btnTitle ? `title="${btnTitle}"` : ''}>
                    ${btnText}
                </button>
            </div>
        </div>
        `;

        prizesContainer.appendChild(prizeCard);
      });

      // 为可兑换的奖品添加点击事件
      document.querySelectorAll('.redeem-btn:not([disabled])').forEach(btn => {
            btn.addEventListener('click', function () {
                const prizeId = parseInt(this.getAttribute('data-prize-id'));
                redeemPrize(prizeId);
            });
      });
    }

        // 兑换奖品
        function redeemPrize(prizeId) {
      const prize = prizes.find(p => p.id === prizeId);

      // 检查是否可以兑换
      if (userData.currentPoints >= prize.pointsRequired && !userData.redeemedPrizes.includes(prizeId)) {
            // 扣除积分
            userData.currentPoints -= prize.pointsRequired;
        // 记录已兑换奖品
        userData.redeemedPrizes.push(prizeId);
        // 保存用户数据
        saveUserData();
        // 更新积分显示
        updatePointsDisplay();
        // 显示兑换成功消息
        redeemMessage.textContent = `恭喜你成功兑换了${prize.name}！`;
        redeemSuccessModal.classList.remove('hidden');
        // 重新渲染奖品列表
        renderPrizes();
      }
    }

        // 页面加载完成后初始化
        document.addEventListener('DOMContentLoaded', init);
