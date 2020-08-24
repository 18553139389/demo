<template>
  <div class="wrapper">
    <headers></headers>
    <navs :itemIndex="itemIndex" @changeNav="changeNav"></navs>
    <div class="list">
      <div class="list-box">
        <ul class="list-item">
          <li class="item" v-for="(v,k) in questions" :key="k" :class="questionIndex == k ? 'active' : ''" @click="changeArr(k)">{{v}}</li>
        </ul>
        <div class="list-right">
          <div class="item1" v-show="show1">
            <div class="item-title">锦绣前程职业兴趣测试</div>
            <div class="item-content">
              <div class="text">
                <p>一、</p>
                <p>本系统测试依据为霍兰德职业兴趣测试，能根据您的性格特点给您推荐适合您的参考专业和参考职业。</p>
              </div>
              <div class="text">
                <p>二、</p>
                <p>本测试选项没有好坏之分，根据您的真实情况作出选择，请您凭第一印象，不暇思索的迅速作答。</p>
              </div>
              <div class="text" v-show="supers ==  0">
                <p>三、</p>
                <p>本测试系统一个高考志愿卡号尽可测试3次，建议您高考前测试一次，高考后测试一次,高考成绩出来 后测试一次，请您谨慎使用。</p>
              </div>
            </div>
            <div class="start" @click="openName">立即开始测试</div>
          </div>
          <div class="item1" v-show="show2">
            <div class="item-title">锦绣前程职业兴趣测试</div>
            <div class="answer">
              "请根据对每一题目的第一印象作答，不必仔细推敲，答案没有好坏、对错之分。具体填写方法是，根据自己的情况回答“是”或“否”
            </div>
            <div class="questions">
              <div class="question-item" v-for="(item,index) in question" :key="index" v-if="(index+1) > numIndex*6 && (index+1) <= (numIndex+1)*6">
                <div class="question-left">{{item.title}}</div>
                <div class="question-right">
                  <div v-for="(ite,idx) in item.choice" :key="idx" :class="ite.state == item.state ? 'choice actives' : 'choice'"
                  @click="goChange(index, ite.state)">{{ite.name}}</div>
                </div>
              </div>
              <div class="start" @click="goQuestion" style="background: #FD6802;margin-bottom: 40px;" v-if="numIndex != 9">继续答题</div>
              <div class="start" @click.once="goResult" style="background: #FD6802;margin-bottom: 40px;" v-if="numIndex == 9 && status">提交测试</div>
              <div class="start" @click="goResult" style="background: #FD6802;margin-bottom: 40px;" v-if="numIndex == 9 && !status">提交测试</div>
              <Progress :percent="percent" :stroke-width="20" status="active"></Progress>
            </div>
          </div>
          <div class="item1" v-show="show3">
            <div class="item-title">锦绣前程职业兴趣测试</div>
            <div class="item-content">
              <div class="text">
                <p>霍兰德在长期职业指导实践基础上提出了著名的职业兴趣 理论。 该理论将人的兴趣类型分为以下六种，每种类型都具有相应的性格个性特征。</p>
              </div>
            </div>
            <div class="type">
              <div class="detail-title">实际型（R）</div>
              <div class="type-item">
                <div class="type-left">1、性格特点：</div>
                <p class="type-right">言辞谨慎、不讲究、谦逊、踏实稳重、诚实可靠。</p>
              </div>
              <div class="type-item">
                <div class="type-left">2、共同特征：</div>
                <p class="type-right">愿意使用工具从事操作性工作，动手能力强，做事手脚灵活，动作协调。偏好于具体任务，不善言辞，做事保守，较为谦虚。缺乏社交能力，通常喜欢独立做事。</p>
              </div>
              <div class="type-item">
                <div class="type-left">3、典型职业：</div>
                <p class="type-right">喜欢智力的、抽象的、分析的、独立的定向任务，要求具备智力或分析才能，并将其用于观察、估测、衡量、形成理论、最终解决问题的工作，并具备相应的能力。</p>
              </div>
            </div>
            <div class="type">
              <div class="detail-title">研究型（I）</div>
              <div class="type-item">
                <div class="type-left">1、性格特点：</div>
                <p class="type-right">坚持性强，有韧性，喜欢钻研。为人好奇，独立性强。</p>
              </div>
              <div class="type-item">
                <div class="type-left">2、共同特征：</div>
                <p class="type-right">思想家而非实干家,抽象思维能力强，求知欲强，肯动脑，善思考，不愿动手。喜欢独立的和富有创造性的工作。知识渊博，有学识才能，不善于领导他人。考虑问题理性，做事喜欢精确，喜欢逻辑分析和推理，不断探讨未知的领域。</p>
              </div>
              <div class="type-item">
                <div class="type-left">3、典型职业：</div>
                <p class="type-right">喜欢使用工具、机器，需要基本操作技能的工作。对要求具备机械方面才能、体力或从事与物件、机器、工具、运动器材、植物、动物相关的职业有兴趣，并具备相应能力。</p>
              </div>
            </div>
            <div class="type">
              <div class="detail-title">艺术型（A）</div>
              <div class="type-item">
                <div class="type-left">1、性格特点：</div>
                <p class="type-right">有创造性、非传统、敏感、容易情绪化、较冲动、不服从指挥。</p>
              </div>
              <div class="type-item">
                <div class="type-left">2、共同特征：</div>
                <p class="type-right">有创造力，乐于创造新颖、与众不同的成果，渴望表现自己的个性，实现自身的价值。做事理想化，追求完美，不重实际。具有一定的艺术才能和个性。善于表达、怀旧、心态较为复杂。</p>
              </div>
              <div class="type-item">
                <div class="type-left">3、典型职业：</div>
                <p class="type-right">喜欢的工作要求具备艺术修养、创造力、表达能力和直觉，并将其用于语言、行为、声音、颜色和形式的审美、思索和感受，具备相应的能力。不善于事务性工作。</p>
              </div>
            </div>
            <div class="type">
              <div class="detail-title">社会型（S）</div>
              <div class="type-item">
                <div class="type-left">1、性格特点：</div>
                <p class="type-right">为人友好、热情、善解人意、乐于助人。</p>
              </div>
              <div class="type-item">
                <div class="type-left">2、共同特征：</div>
                <p class="type-right">喜欢与人交往、不断结交新的朋友、善言谈、愿意教导别人。关心社会问题、渴望发挥自己的社会作用。寻求广泛的人际关系，比较看重社会义务和社会道德。</p>
              </div>
              <div class="type-item">
                <div class="type-left">3、典型职业：</div>
                <p class="type-right">喜欢要求与人打交道的工作，能够不断结交新的朋友，从事提供信息、启迪、帮助、培训、开发或治疗等事务，并具备相应能力。</p>
              </div>
            </div>
            <div class="type">
              <div class="detail-title">企业型（E）</div>
              <div class="type-item">
                <div class="type-left">1、性格特点：</div>
                <p class="type-right">善辩、精力旺盛、独断、乐观、自信、好交际、机敏、有支配愿望。</p>
              </div>
              <div class="type-item">
                <div class="type-left">2、共同特征：</div>
                <p class="type-right">追求权力、权威和物质财富，具有领导才能。喜欢竞争、敢冒风险、有野心、抱负。为人务实，习惯以利益得失，权利、地位、金钱等来衡量做事的价值，做事有较强的目的性。</p>
              </div>
              <div class="type-item">
                <div class="type-left">3、典型职业：</div>
                <p class="type-right">喜欢要求具备经营、管理、劝服、监督和领导才能，以实现机构、政治、社会及经济目标的工作，并具备相应的能力。</p>
              </div>
            </div>
            <div class="type">
              <div class="detail-title">常规型（C）</div>
              <div class="type-item">
                <div class="type-left">1、性格特点：</div>
                <p class="type-right">有责任心、依赖性强、高效率、稳重踏实、细致、有耐心。</p>
              </div>
              <div class="type-item">
                <div class="type-left">2、共同特征：</div>
                <p class="type-right">尊重权威和规章制度，喜欢按计划办事，细心、有条理，习惯接受他人的指挥和领导，自己不谋求领导职务。喜欢关注实际和细节情况，通常较为谨慎和保守，缺乏创造性，不喜欢冒险和竞争，富有自我牺牲精神。</p>
              </div>
              <div class="type-item">
                <div class="type-left">3、典型职业：</div>
                <p class="type-right">喜欢要求具备经营、管理、劝服、监督和领导才能，以实现机构、政治、社会及经济目标的工作，并具备相应的能力。</p>
              </div>
            </div>
          </div>
          <div class="item1" v-show="show4">
            <div class="item-title">锦绣前程职业兴趣测试</div>
            <div class="item-content">
              <div class="text">
                <p>霍兰德从人格与环境交互作用的观点出发,将职业环境也划分为六种模式,不同的职业兴趣类型要求有与之相对应的职业环境。将你测验得分居第一位的职业类型找出来，对照下表，判断一下自己适合的职业。</p>
              </div>
            </div>
            <div class="type">
              <div class="detail-title">实际型（R）</div>
              <div class="type-item">
                <p class="type-right">木匠 、农民 、操作X光的技师
                  、飞机机械师、鱼类、和野生动物专家、自动化技师、机械工（车工、钳工等）、电工、无线电报务员、火车司机、长途公共汽车司机、机械制图员、修理机器、电器师</p>
              </div>
            </div>
            <div class="type">
              <div class="detail-title">研究型（I）</div>
              <div class="type-item">
                <p class="type-right">气象学者、生物学者、天文学家、药剂师、动物学者、化学家、科学报刊编辑、地质学者、植物学者、物理学者、数学家、实验员、科研人员、科技作者</p>
              </div>
            </div>
            <div class="type">
              <div class="detail-title">艺术型（A）</div>
              <div class="type-item">
                <p class="type-right">室内装饰专家、图书管理专家、摄影师、音乐教师、作家、演员、记者、诗人、作曲家、编剧、雕刻家、漫画家</p>
              </div>
            </div>
            <div class="type">
              <div class="detail-title">社会型（S）</div>
              <div class="type-item">
                <p class="type-right"> 社会学者、导游、福利机构工作者、咨询人员、社会工作者、社会教师、学校领导、精神病工作者、公共保健护士</p>
              </div>
            </div>
            <div class="type">
              <div class="detail-title">企业型（E）</div>
              <div class="type-item">
                <p class="type-right"> 推销员、进货员、商品批发员、旅游经理、饭店经理、广告宣传员、调度员、律师、政治家、零售商</p>
              </div>
            </div>
            <div class="type">
              <div class="detail-title">常规型（C）</div>
              <div class="type-item">
                <p class="type-right">记帐员、会计、银行出纳、法庭速记员、成本估算员、税务员、核算员、打字员、办公室职员、计算机操作员、秘书</p>
              </div>
            </div>
            <div class="item-content">
              <div class="text">
                <p>下面介绍与你的3个职业兴趣代码一致的职业表，对照的方法如下：首先 根据你的职业兴趣代码，在下表中找出相应的职业，例如你的职业兴趣代码是
                  RIA，那么牙科技术人员、陶工等是适合你兴趣的职业。然后寻找与你职业兴趣 代码相近的职业，如你的职业兴趣代号是RIA，那么，其他由这三个字母组合
                  成的编号(如IRA、IAR、ARI等)对应的职业，也较适合你的兴趣。</p>
              </div>
            </div>
            <div class="type">
              <div class="detail-title">实际型（R）</div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">RIA</div>
                <p class="type-right">牙科技术员、陶工、建筑设计员、模型工、细木工、制作链条人员。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">RIS</div>
                <p class="type-right">厨师、林务员、跳水员、潜水员、染色工、电器修理、眼镜制作、电工、纺织机械装配工、报务员、装玻璃工人、发电厂操作工人、焊接工。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">RIE</div>
                <p class="type-right">建筑和桥梁工程、环境工程、航空工程、公路工程、电力工程、信号工程、电话工程、一般机械工程、自动工程、矿业工程、海洋工程、交通工程技术人员、制图员、家政经济人员、打捞员、计量员、农民、农场工人、农业机器操作、清洁工、无线电修理、汽车修理、手表修理、管子工、线路维修、盖（修）房工、电子技术员、代木工、机械师、锻压操作工、造船装配工、工具仓库管理员。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">RAI</div>
                <p class="type-right">船上工作人员、接待员、杂志保管员、牙科医生的助手、制帽工、磨坊工、石匠、机器制造、机车（火车头）制造、农业机器装配、汽车装配工、缝纫机装配工、钟表装配和检验、电动器具装配、鞋匠、锁匠、货物检验员、电梯机修工、托儿所所长、钢琴调音工、装配工、印刷工、建筑钢铁工人、卡车司机。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">RIC</div>
                <p class="type-right">手工雕刻、玻璃雕刻、制作模型人员、家具木工、制作皮革品、手工绣花、手工钩针纺织、排字工人、印刷拼板工人、图画雕刻、装订工。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">RSE</div>
                <p class="type-right">消防员、交通巡警、门卫、理发师、房间清洁工、屠夫、锻工、开凿人、管道安装工、出租汽车驾驶员、仓库管理员。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">RSI</div>
                <p class="type-right">纺织工、纺织工、农业学校的教师、某些职业课程教师（诸如艺术、商业、技术、工艺课程）、雨衣上胶工人。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">REC</div>
                <p class="type-right">抄水表员、保姆、实验室动物饲养员、动物管理员。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">REI</div>
                <p class="type-right">轮船船长、航海领航员、大副、试管实验员。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">RES</div>
                <p class="type-right">旅馆服务员、家畜饲养员、渔民、渔网修补工、水手长、收割机操作工、搬行李工人、公园服务员、救生员、登山导游、火车工程技术员、建筑工人、铺轨工人。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">RCI</div>
                <p class="type-right">测量员、勘测员、仪器操作者、农业工程技师、化学工程师、民用工程技师、石油工程技师、资料室管理员、探矿工、煅烧工、烧窑工、矿工、保养工、磨床工、取样员、样品检验员、纺纱工、炮手、漂洗工、电焊工、锯木工、刨床工、制帽工、手工缝纫、油漆工、染色工、按摩师、木匠、农民、建筑工人、电影放映员、勘测员助手。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">RCS</div>
                <p class="type-right">公共汽车驾驶员、一等水手、游泳池服务员、裁缝、建筑工人、石匠、烟囱修理工、水磨石工、泥水匠、车工、烟囱修建工、混凝土工、电话修理工、爆炸手、邮递员、矿工、裱糊工人、纺纱工。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">RCE</div>
                <p class="type-right">打井工、吊车驾驶员、农场工人、邮件分类员、铲车司机、拖拉机司机。</p>
              </div>
            </div>
            <div class="type">
              <div class="detail-title">研究型（I）</div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">IAS</div>
                <p class="type-right">普通经济学家、农业经济学家、财政经济学家、国际贸易经济学家、实验心理学家、工程心理学家、心理学家、哲学家、内科医生、数学家。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">IAR</div>
                <p class="type-right">人类学家、天文学家、化学家、物理学家、医学病理学家、动物标本录制者、化石修复者、艺术品管理员。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">ISE</div>
                <p class="type-right">营养学家、饮食顾问、火灾检查员、邮政服务检查员。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">ISC</div>
                <p class="type-right">侦察员、电视播音室修理工、电视修理服务员、验尸室人员、编目录的人、医学实验室技师、调查研究者。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">ISR</div>
                <p class="type-right">水生生物学者、昆虫学家、微生物学家、配镜师、矫正视力者、细菌学家、牙科医生、骨科医生。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">ISA</div>
                <p class="type-right">实验心理学家、普通心理学家、发展心理学家、教育心理学家、社会心理学家、临床心理学家、目录学家、皮肤病学家、神经病学家、妇产科医生、眼科医生、五官科医生、医学实验室技术专家、民航医务人员、护士。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">IES</div>
                <p class="type-right">细菌学家、生理学家、化学专家、地质专家、地理物理学专家、纺织技术专家、医院药剂师、工业药剂师、药房营业员。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">IEC</div>
                <p class="type-right">档案保管员、保险统计员。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">ICR</div>
                <p class="type-right">质量检查技术员、地质学技师、工程师、法官、图书馆技术辅助员、计算机操作者、医院听诊员、家禽检查员。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">IRA</div>
                <p class="type-right">地理学家、地质学家、声学物理学家、矿物学家、古生物学家、石油地质学家、地震学者、原子和分子物理学家、电学和磁学物理学家、气象学家、设计审核员、人口统计学家、数学统计学家、外科医生、城市规划家、气象员。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">IRS</div>
                <p class="type-right">流体物理学家、物理海洋学家、等离子体物理学家、农业科学家、动物学家、食品科学家、园艺学家、植物学家、细菌学家、解剖学家、动物病理学家、作物病理学家、药物学家、生物化学家、生物物理学家、细胞生物学家、临床化学家、遗传学家、分子生物学家、质量控制工程师、地理学家、兽医、放射治疗技师。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">IRE</div>
                <p class="type-right">化验员、化学工程师、纺织工程师、食品技师、渔业技术专家、材料和测试工程师、电气工程师、土木工程师、航空工程师、行政官员、冶金专家、原子核工程师、陶瓷工程师、地质工程师、电力工程师、口腔科医生、牙科医生。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">IRC</div>
                <p class="type-right">飞机领航员、飞行员、物理实验室技师、文献检查员、农业技术专家、动植物技术专家、生物技师、油管检查员、工商业规划者、矿藏安全检查员、纺织品检验员、照相机修理工、工程技术员、编计算机程序者、工具设计者、仪器维修工。</p>
              </div>
            </div>
            <div class="type">
              <div class="detail-title">艺术型（A）</div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">ASE</div>
                <p class="type-right">戏剧导演、舞蹈教师、广告撰稿人、报刊专栏作者、记者、演员、英语导游、外语翻译。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">ASI</div>
                <p class="type-right">音乐教师、乐器教师、美术教师、管弦乐指挥、合唱队指挥、歌星、演奏家、哲学家、作家、广告经理、时装模特儿。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">AER</div>
                <p class="type-right">新闻摄影师、电视摄像师、艺术指导、录音指导、丑角演员、魔术师、木偶戏演员、骑士、跳水员。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">AEI</div>
                <p class="type-right">音乐指挥、舞台指导、电影导演。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">AES</div>
                <p class="type-right"> 流行歌手、舞蹈演员、电影导演、广播节目主持人、舞蹈教师、口技表演者、喜剧演员、模特儿。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">AES</div>
                <p class="type-right"> 流行歌手、舞蹈演员、电影导演、广播节目主持人、舞蹈教师、口技表演者、喜剧演员、模特儿。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">AIS</div>
                <p class="type-right"> 画家、剧作家、编辑、评论家、时装艺术大师、家具设计师、包装设计师、布景设计师、服装设计师、新闻摄影师、男演员、文学作者。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">AIE</div>
                <p class="type-right"> 花匠、皮衣设计师、工业产品设计师、剪影艺术家、复制雕刻品大师。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">AIR</div>
                <p class="type-right"> 建筑师、画家、摄影师、绘图员、环境美化工、雕刻家、包装设计师、陶器设计师、绣花工、漫画家。</p>
              </div>
            </div>
            <div class="type">
              <div class="detail-title">社会型（S）</div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">SEC</div>
                <p class="type-right">社会活动家、退伍军人服务官员、工商会事务代表、教育咨询者、宿舍管理员、旅馆经理、饮食服务管理员。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">SER</div>
                <p class="type-right">体育教练、游泳指导。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">SER</div>
                <p class="type-right">体育教练、游泳指导。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">SEI</div>
                <p class="type-right">大学校长、学院院长、医院行政管理员、历史学家、家政经济学家、职业学校教师、资料员。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">SEA</div>
                <p class="type-right">娱乐活动管理员、国外服务办事员、社会服务助理、一般咨询者、宗教教育工作者。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">SCE</div>
                <p class="type-right">部长助理、福利机构职员、生产协调人、环境卫生管理人员、戏院经理、餐馆经理、售票员。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">SRI</div>
                <p class="type-right">外科医师助手、医院服务员。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">SRE</div>
                <p class="type-right">体育教师、职业病治疗者、体育教练、专业运动员、房管员、儿童家庭教师、警察、引座员、传达员、保姆。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">SRC</div>
                <p class="type-right">护理员、护理助手、医院勤杂工、理发师、学校儿童服务人员。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">SIA</div>
                <p class="type-right">社会学家、心理咨询者、学校心理学家、政治科学家、大学或学院的系主任、大学或学院的教育学教师、大学农业教师、大学工程和建筑课程的教师、大学数学、医学、物理、社会科学和生命科学的教师、研究生助教、成人教育教师。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">SIE</div>
                <p class="type-right">营养学家、饮食学家、海关检查员、安全检查员、税务稽查员、校长。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">SIC</div>
                <p class="type-right">描图员、兽医助手、诊所助理、体检检查员、监督缓邢犯的工作者、娱乐指导员、咨询人员、社会科学教师。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">SIR</div>
                <p class="type-right">理疗员、救护队工作人员、手足病医生、职业病治疗助手。</p>
              </div>
            </div>
            <div class="type">
              <div class="detail-title">企业型（E）</div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">ECI</div>
                <p class="type-right">银行行长、审计员、信用管理员、地产管理员、商业管理员。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">ECS</div>
                <p class="type-right">信用办事员、保险人员、各类进货员、海关服务经理、售货员、购买员、会计。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">ECS</div>
                <p class="type-right">信用办事员、保险人员、各类进货员、海关服务经理、售货员、购买员、会计。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">ERI</div>
                <p class="type-right">建筑物管理员、工业工程师、农场管理员、护士长、农业经营管理人员。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">ERS</div>
                <p class="type-right">仓库管理员、房屋管理员、货栈监督人。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">ERC</div>
                <p class="type-right">邮政局长、渔船船长、机械操作领班、木工领班、瓦工领班、驾驶员领班。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">EIR</div>
                <p class="type-right">科学、技术和有关周期出版物的管理员。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">EIC</div>
                <p class="type-right">专利代理人、鉴定人、运输服务检查员、安全检查员、废品收购人员。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">EIS</div>
                <p class="type-right">警官、侦察员、交通检查员、安全咨询者、合同管理者、商人。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">EAS</div>
                <p class="type-right">法官、律师、公证人。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">EAR</div>
                <p class="type-right">展览室管理员、舞台管理员、播音员、训兽员。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">ESC</div>
                <p class="type-right">理发师、裁判员、政府行政管理员、财政管理员、工程管理员、职业病防治、售货员、商业经理、办公室主任、人事负责人、调度员。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">ESR</div>
                <p class="type-right">家具售货员、书店售货员、公共汽车的驾驶员、日用商品的售货员、护士长、自然科学和工程的行政领导。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">ESI</div>
                <p class="type-right">博物馆管理员、图书馆管理员、古迹管理员、饮食业经理、地区安全服务管理员、技术服务咨询者、超级市场管理员、零售商品店店员、批发商、出租汽车服务站调度。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">ESA</div>
                <p class="type-right">博物馆馆长、报刊管理员、音乐器材售货员、广告商、售画营业员、导游、（轮船或班机上的）事务长、飞机上的服务员、船员、法官、律师。</p>
              </div>
            </div>
            <div class="type">
              <div class="detail-title">常规型（C）</div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">CRI</div>
                <p class="type-right">簿记员、会计、记时员、铸造机操作工、打字员、按键操作工、复印机操作工。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">CRS</div>
                <p class="type-right">仓库保管员、档案管理员、缝纫工、讲述员、收款人。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">CRE</div>
                <p class="type-right">标价员、实验室工作者、广告管理员、自动打字机操作员、电动机装配工、缝纫机操作工。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">CIS</div>
                <p class="type-right">记帐员、顾客服务员、报刊发行员、土地测量员、保险公司职员、会计师、估价员、邮政检查员、外贸检查员。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">CIE</div>
                <p class="type-right">打字员、统计员、支票记录员、订货员、校对员、办公室工作人员。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">CIR</div>
                <p class="type-right">校对员、工程职员、海底电报员、检修计划员、发报员。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">CSE</div>
                <p class="type-right">接待员、通讯员、电话接线员、卖票员、旅馆服务员、私人职员、商学教师、旅游办事员。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">CSR</div>
                <p class="type-right">运货代理商、铁路职员、交通检查员、办公室通信员。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">CSA</div>
                <p class="type-right">秘书、图书管理员、办公室办事员。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">CER</div>
                <p class="type-right">邮递员、数据处理员、航空邮件检查员。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">CEI</div>
                <p class="type-right">推销员、经济分析家。</p>
              </div>
              <div class="type-item">
                <div class="type-left" style="width: 60px;">CES</div>
                <p class="type-right">银行会计、记帐员、法人秘书、速记员、法院报告人。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="user" v-if="show" @click="goHide">
      <div class="comment" @click.stop="">
        <div class="comment-title">请输入您的名字</div>
        <input class="name" type="text" v-model="name" placeholder="姓名">
        <div class="warn" v-if="isSupreme == 0">普通卡可以用3次，剩余{{point}}次测评机会</div>
        <div class="starts" @click.stop="goStart">开始测评</div>
      </div>
    </div>
    <chat></chat>
    <div class="footer" v-if="!control">
      <footers></footers>
    </div>
    <footers v-if="control"></footers>
  </div>
</template>

<script>
  import Headers from '../components/top.vue'
  import Footers from '../components/bottom.vue'
  import Navs from '../components/navs.vue'
  import Chat from '../components/chat.vue'
  import Request from '../../utils/request.js'
  export default {
    data() {
      return {
        itemIndex: 1,
        questionIndex: 0,
        questions: ['霍兰德测试', '职业人格类型', '职业代码对照表'],
        control: true,
        name: '',
        show: false,
        show1: true,
        show2: false,
        show3: false,
        show4: false,
        check: false,
        totalPage: 0,
        numIndex: 0,
        percent: 10,
        list: [],
        supers: null,
        question: [],
        arr: [],
        point: 0,
        isSupreme: 0,
        status: false,
        bodyHeight: document.documentElement.offsetHeight || document.body.offsetHeight
      }
    },
    components: {
      Headers,
      Navs,
      Footers,
      Chat
    },
    mounted() {
      this.supers = sessionStorage.getItem("isSupreme")
      this.point = 3 - parseInt(sessionStorage.getItem("testNum"))
      this.isSupreme = sessionStorage.getItem("isSupreme")
      this.pos()
      this.init()
    },
    watch: {
      bodyHeight() {
        this.pos()
      }
    },
    methods: {
      changeNav(k) {
        this.itemIndex = k
      },
      init() {
        let self = this
        Request.postRequest('jinxiuqiancheng/api/testList').then(res => {
          console.log(res)
          if (res.data.result == 0) {
            self.question = res.data.dataList
            self.question.forEach((item, index) => {
              item.state = null
              item.choice = [{
                  name: '是',
                  state: 1
                },
                {
                  name: '否',
                  state: 0
                }
              ]
            })
            self.$nextTick(() => {
              self.pos()
            })
          } else {
            this.$Message.warning(res.data.resultNote)
          }
        }).catch(res => {
          console.log(res)
        })
      },
      pos() {
        let bodyHeight = document.documentElement.offsetHeight || document.body.offsetHeight //获取当前body高度
        let winHeight = document.documentElement.clientHeight || document.body.clientHeight //获取当前页面高度
        if (bodyHeight - winHeight > 0) {
          this.control = true
        } else {
          this.control = false
        }
      },
      changeArr(k) {
        if (this.questionIndex == k) {
          return
        }
        this.questionIndex = k
        if (k == 0) {
          if (this.check) {
            this.show1 = false
            this.show2 = true
            this.show3 = false
            this.show4 = false
          } else {
            this.show1 = true
            this.show2 = false
            this.show3 = false
            this.show4 = false
          }
        } else if (k == 1) {
          this.show1 = false
          this.show2 = false
          this.show3 = true
          this.show4 = false
        } else {
          this.show1 = false
          this.show2 = false
          this.show3 = false
          this.show4 = true
        }
        this.$nextTick(() => {
          this.pos()
        })
      },
      openName() {
        this.show = true
      },
      goHide() {
        this.show = false
      },
      goStart() {
        if (this.name == '') {
          this.$Message.warning('姓名不能为空')
          return
        }
        if (this.point == 0 && this.isSupreme == 0) {
          this.$Message.warning('您的测试次数已达到上限')
          return
        }
        this.show = false
        this.show1 = false
        this.show2 = true
        this.check = true
        this.$nextTick(() => {
          this.pos()
        })
      },
      goChange(k, status) {
        this.question[k].state = status
        this.$forceUpdate()
        if(k == 9) {
          for(let i=54;i<60;i++) {
            if(this.question[i].state == null) {
              this.status = false
              return
            }
          }
          this.status = true
        }
      },
      goQuestion() {
        for(let i=(this.numIndex*6);i<(this.numIndex+1)*6;i++) {
          if(this.question[i].state == null) {
            this.$Message.warning('回答不能为空')
            return false
          }
        }

        if (this.numIndex == 10) {
          return
        }

        this.numIndex++
        this.percent += 10
      },
      goResult() {
        for(let i=54;i<60;i++) {
          if(this.question[i].state == null) {
            this.$Message.warning('回答不能为空')
            return false
          }
        }
        this.status = true
        let self = this
        this.question.forEach((item, index) => {
          let obj = {}
          obj.testId = item.id
          if (item.state == 1) {
            obj.answer = 1
          } else {
            obj.answer = 0
          }
          self.arr.push(obj)
        })
        let datas = {
          uid: sessionStorage.getItem("uid"),
          name: this.name,
          answerList: self.arr
        }
        Request.postRequest('jinxiuqiancheng/api/answer', datas).then(res => {
          if (res.data.result == 0) {
            this.$Message.success('提交成功')
            let num = parseInt(sessionStorage.getItem("testNum"))
            num++
            if (num >= 3) {
              sessionStorage.setItem("testNum", 3)
            } else {
              sessionStorage.setItem("testNum", num)
            }
            sessionStorage.setItem("isTest", 1)
            setTimeout(() => {
              self.$router.push({
                name: 'result'
              })
            }, 500)
          } else {
            this.$Message.warning(res.data.resultNote)
          }
        }).catch(res => {
          console.log(res)
        })
      }
    }
  }
</script>

<style scoped="scoped">
  @media screen and (min-width: 1024px) {
    .list {
      width: 1200px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 40px auto 0;
      padding-bottom: 166px;
    }
  }

  @media screen and (max-width: 1024px) {
    .list {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 40px 0 0;
      padding-bottom: 166px;
    }

    .titles {
      width: 80%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .list-detail {
      width: 70%;
      display: flex;
      flex-direction: column;
    }
  }

  .wrapper {
    width: 100%;
    height: 100%;
  }

  .list-box {
    width: 90%;
    display: flex;
    justify-content: space-between;
  }

  .list-item {
    display: flex;
    flex-direction: column;
  }

  .item,
  .detail {
    height: 50px;
    padding: 16px 30px;
    background: rgb(230, 230, 230);
    border-radius: 6px;
    font-size: 15px;
    color: #666;
    font-weight: 600;
    margin-bottom: 14px;
    cursor: pointer;
    box-sizing: border-box;
  }

  .active {
    background: rgb(255, 3, 80);
    color: #FFFFFF;
  }

  .list-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-left: 24px;
    box-sizing: border-box;
  }

  .item1 {
    display: flex;
    flex-direction: column;
  }

  .item-title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 15px;
    color: #333;
  }

  .item-content {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    font-size: 12px;
    color: #666;
    background: #f6f6f6;
    margin-top: 16px;
    border-radius: 4px;
  }

  .text {
    width: 100%;
    margin: 24px auto;
    display: flex;
  }

  .text>p {
    margin-left: 10px;
    line-height: 20px;
    text-align: justify;
    font-size: 15px;
  }

  .start {
    width: 25%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    color: #fff;
    border-radius: 4px;
    background: rgb(255, 3, 80);
    margin: 36px auto 0;
    cursor: pointer;
  }

  .answer {
    width: 100%;
    padding: 24px;
    box-sizing: border-box;
    font-size: 14px;
    color: #666;
    background: #f6f6f6;
    margin: 24px 0;
  }

  .questions {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .question-item {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
  }

  .question-left {
    width: 80%;
    padding: 20px;
    box-sizing: border-box;
    font-size: 14px;
    color: #666;
    background: #f6f6f6;
  }

  .question-right {
    display: flex;
  }

  .actives {
    background: #ff0350 !important;
    color: #fff !important;
  }

  .choice {
    font-size: 14px;
    color: #333;
    padding: 20px;
    border-radius: 4px;
    background: #ccc;
    margin-left: 12px;
    cursor: pointer;
  }

  .user {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 800;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .comment {
    width: 25%;
    height: 35%;
    border-radius: 6px;
    background: #fff;
    background: #fff;
    padding: 24px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }

  .comment-title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    color: #333;
  }

  .name {
    width: 80%;
    margin: 24px auto;
    height: 42px;
    background: #f6f6f6;
    border-radius: 4px;
    font-size: 14px;
    color: #333;
    border: none;
    outline: none;
    padding: 0 16px;
    box-sizing: border-box;
  }

  .warn {
    width: 80%;
    font-size: 12px;
    color: red;
    margin: 0 auto;
  }

  .starts {
    width: 35%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    color: #fff;
    border-radius: 8px;
    background: rgb(255, 3, 80);
    margin: 50px auto 0;
    cursor: pointer;
  }

  .detail {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .detail-title {
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 15px;
    color: #333;
    font-weight: 600;
    position: relative;
    padding-left: 16px;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
    margin-bottom: 20px;
  }

  .detail-title:before {
    content: '';
    position: absolute;
    width: 4px;
    height: 16px;
    border-radius: 30px;
    top: 17px;
    left: 0;
    background: #FF0350;
  }

  .type {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .type-item {
    width: 100%;
    display: flex;
    margin-bottom: 12px;
  }

  .type-left {
    width: 100px;
    font-size: 14px;
    color: #666;
    line-height: 20px;
  }

  .type-right {
    max-width: 85%;
    font-size: 14px;
    color: #666;
    line-height: 20px;
    text-align: justify;
  }

  .footer {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
  }
</style>
