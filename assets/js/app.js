/* EUROVEST — Core Application Logic
   Handles: Auth, Sessions, Notifications, AI Support, Messaging, Transactions, Loans, Email/SMS
   All data stored in localStorage for demo persistence.
*/

var EV = EV || {};

// ===================== PORTFOLIOS & LOANS CATALOG =====================
EV.catalog = {
  portfolios: [
    'FR Conservative Portfolio','FR Balanced Portfolio','FR Growth Portfolio',
    'IT Conservative Portfolio','IT Balanced Portfolio','IT Growth Portfolio',
    'Euro Growth Portfolio','Global Growth Portfolio'
  ],
  loanTypes: [
    'Personal Loan','Mortgage Loan','Auto Loan','Business Loan','Student Loan',
    'Debt Consolidation Loan','Home Equity Loan','Bridge Loan','Equipment Financing',
    'Credit Line / revolving','Green Energy Loan','Medical Loan'
  ],
  products: [
    'CAC 40 Index Fund','FTSE MIB ETF','Euro Stoxx 50 ETF','MSCI World ETF',
    'S&P 500 ETF','BTP Italia 2035','French OAT 10Y','Green Bond Fund',
    'European SCPI','Bitcoin','Ethereum','Gold ETC','Silver ETC',
    'PER Retirement Fund','Livret A Savings','LDDS Savings','Private Equity Fund I',
    'Venture Capital Fund','Infrastructure Fund','European Dividend Fund',
    'Nasdaq 100 ETF','Emerging Markets ETF','Japan Topix ETF','Real Estate Crowdfunding'
  ]
};

// ===================== MOTIVATIONAL EMAIL TEMPLATES =====================
EV.emailTemplates = [
  {
    id:'welcome', icon:'🎉', name:'Welcome & Get Started',
    subject:'Welcome to EuroVest — Your Journey to Wealth Begins Here',
    body:'Dear {name},\n\nWelcome to the EuroVest family! We are thrilled to have you join thousands of investors across France and Italy who are building their financial future with us.\n\nYour account is now active, and you are just steps away from your first investment. Here is how to get started:\n\n1. Complete your identity verification (KYC) in your dashboard\n2. Make your first deposit via SEPA, card, or open banking\n3. Choose a portfolio that matches your risk profile\n4. Watch your investments grow!\n\nRemember, our AI support assistant is available 24/7 in your language to answer any questions.\n\nStart investing today →\n\nWarm regards,\nThe EuroVest Team'
  },
  {
    id:'motivate1', icon:'🚀', name:'Investment Opportunity — Markets Are Moving',
    subject:'🚀 Don\'t Miss Today\'s Investment Opportunities',
    body:'Dear {name},\n\nThe markets are presenting exceptional opportunities right now. European equities are showing strong momentum, and our managed portfolios are performing above target this quarter.\n\nHere is a snapshot of what is happening:\n\n• CAC 40 and FTSE MIB indices are trending upward\n• Our Euro Growth portfolio is up 8.4% year-to-date\n• Green energy and sustainable funds are outperforming expectations\n• Italian BTP yields remain attractive for income investors\n\nNow is the perfect time to review your portfolio and consider increasing your investment. Even a small additional contribution can make a big difference over time thanks to compound growth.\n\nLog in to your dashboard to explore opportunities →\n\nBest regards,\nThe EuroVest Investment Team'
  },
  {
    id:'motivate2', icon:'📈', name:'Portfolio Performance Update',
    subject:'📈 Your Portfolio Is Growing — See Your Progress',
    body:'Dear {name},\n\nGreat news! We wanted to share an update on how your investments are performing.\n\nThis quarter, your portfolio has shown solid progress. Our investment strategists continue to optimize your holdings to maximize returns while managing risk according to your profile.\n\nKey highlights:\n\n• Diversified exposure across European and global markets\n• Active rebalancing to capture growth opportunities\n• Transparent fees with no hidden costs\n\nKeep up the great work as an investor. Consistency is the key to long-term wealth building.\n\nView your full portfolio details →\n\nWarmly,\nThe EuroVest Team'
  },
  {
    id:'motivate3', icon:'💰', name:'Start Small, Grow Big',
    subject:'💰 Every Great Fortune Started With a First Investment',
    body:'Dear {name},\n\nDid you know that some of the world\'s most successful investors started with very small amounts? The secret is not how much you start with — it is that you start.\n\nAt EuroVest, you can begin investing with as little as €100. Here is what that could look like over time:\n\n• €100/month for 10 years at 6% average return = ~€16,000\n• €250/month for 20 years at 7% average return = ~€130,000\n• €500/month for 30 years at 8% average return = ~€680,000\n\nThe earlier you start, the more time your money has to grow through the power of compounding.\n\nReady to take the next step? Log in and explore our portfolios →\n\nBelieving in your financial future,\nThe EuroVest Team'
  },
  {
    id:'motivate4', icon:'🌱', name:'Sustainable Investing Appeal',
    subject:'🌱 Invest in Your Values — Sustainable Portfolios Available',
    body:'Dear {name},\n\nWhat if your investments could grow your wealth AND make the world a better place?\n\nOur Sustainable and ESG portfolios allow you to invest in companies that prioritize environmental responsibility, social impact, and strong governance — without sacrificing returns.\n\nSustainable investing highlights:\n\n• Green bonds financing renewable energy projects\n• ESG-screened equity funds\n• European green transition infrastructure\n• Competitive returns aligned with your values\n\nJoin the growing movement of investors who believe profit and purpose can go hand in hand.\n\nExplore sustainable portfolios →\n\nWith purpose,\nThe EuroVest Team'
  },
  {
    id:'motivate5', icon:'🏦', name:'Retirement Planning',
    subject:'🏦 Is Your Retirement On Track? Let\'s Check Together',
    body:'Dear {name},\n\nRetirement may seem far away, but the best time to plan for it is now. Whether you are in France with a PER (Plan d\'Épargne Retraite) or in Italy with your pension planning, EuroVest can help you build a retirement nest egg that gives you peace of mind.\n\nConsider this:\n\n• State pensions alone may not maintain your lifestyle\n• Tax-advantaged retirement products can boost your savings\n• Starting early means smaller contributions over a longer period\n• Our Conservative and Balanced portfolios are ideal for retirement planning\n\nLet us help you secure your future. Review our retirement investment options today.\n\nPlan your retirement →\n\nLooking out for your future,\nThe EuroVest Team'
  },
  {
    id:'motivate6', icon:'🔥', name:'Limited-Time Portfolio Offer',
    subject:'🔥 Special Offer — Reduced Fees on Growth Portfolios This Month',
    body:'Dear {name},\n\nWe have an exciting opportunity for you! For a limited time, we are offering reduced management fees on our Growth and Global Growth portfolios.\n\nOffer details:\n\n• 25% off management fees on Growth portfolios\n• Free portfolio consultation with our advisors\n• No minimum increase required\n\nThis is our way of thanking you for being a valued EuroVest investor and encouraging you to take advantage of current market conditions.\n\nThis offer is available for a limited time only. Do not miss out!\n\nClaim your offer →\n\nWarm regards,\nThe EuroVest Team'
  },
  {
    id:'motivate7', icon:'🏆', name:'Milestone & Achievement',
    subject:'🏆 Congratulations on Your Investment Milestone!',
    body:'Dear {name},\n\nCongratulations! You have reached an important milestone in your investment journey with EuroVest. Your dedication to building your financial future is truly commendable.\n\nAs a valued investor, you now have access to:\n\n• Priority customer support\n• Advanced portfolio analytics\n• Exclusive investment opportunities\n• Regular market insights and reports\n\nKeep investing, keep growing. The best is yet to come!\n\nCelebrate your progress →\n\nProud of your journey,\nThe EuroVest Team'
  },
  {
    id:'motivate8', icon:'⚡', name:'Act Now — Time in the Market',
    subject:'⚡ Time in the Market Beats Timing the Market',
    body:'Dear {name},\n\nIt is natural to wonder: "Is now the right time to invest?" The truth is, time IN the market almost always beats timing the market.\n\nInvestors who stay invested through market ups and downs historically achieve better long-term results than those who try to time their entries and exits.\n\nAt EuroVest, our managed portfolios are designed for long-term growth:\n\n• Professional rebalancing keeps your portfolio on track\n• Diversification reduces the impact of volatility\n• Regular contributions (dollar-cost averaging) smooth out market fluctuations\n\nDo not wait for the "perfect" moment. The perfect moment is now.\n\nStart or increase your investment →\n\nYour partners in growth,\nThe EuroVest Team'
  },
  {
    id:'verify', icon:'✅', name:'KYC Verification Reminder',
    subject:'✅ Complete Your Verification to Unlock Full Features',
    body:'Dear {name},\n\nThis is a friendly reminder to complete your identity verification (KYC) in your EuroVest dashboard.\n\nCompleting your verification allows you to:\n\n• Make deposits and withdrawals without limits\n• Access all investment products\n• Generate official transaction receipts\n• Ensure compliance with European regulations\n\nThe process takes just a few minutes — simply upload your government ID and proof of address in your dashboard settings.\n\nComplete verification now →\n\nThank you for helping us keep EuroVest secure,\nThe EuroVest Compliance Team'
  }
];

// ===================== DATA STORE =====================
EV.store = {
  get: function(key, def) {
    try { var v = localStorage.getItem('ev_'+key); return v ? JSON.parse(v) : (def||null); }
    catch(e){ return def||null; }
  },
  set: function(key, val) {
    try { localStorage.setItem('ev_'+key, JSON.stringify(val)); } catch(e){}
  },
  push: function(key, item) {
    var arr = this.get(key, []);
    arr.push(item); this.set(key, arr); return arr;
  }
};

// ===================== EMAIL & SMS SIMULATION =====================
EV.mail = {
  // Simulate sending an email — stores a record the user can see
  send: function(to, subject, body, opts) {
    opts = opts || {};
    var record = {
      id: 'E'+Date.now()+Math.random().toString(36).slice(2,5),
      to: to, subject: subject, body: body,
      time: new Date().toISOString(),
      type: opts.type || 'notification',
      template: opts.template || null,
      read: false
    };
    EV.store.push('email_log', record);
    // If to a specific user, also store in their email inbox
    if (opts.userId) {
      EV.store.push('user_emails_'+opts.userId, record);
    }
    return record;
  },
  // Simulate sending an SMS
  sendSMS: function(phone, message, opts) {
    opts = opts || {};
    var record = {
      id: 'S'+Date.now()+Math.random().toString(36).slice(2,5),
      to: phone, message: message,
      time: new Date().toISOString(),
      type: opts.type || 'sms_notification',
      read: false
    };
    EV.store.push('sms_log', record);
    if (opts.userId) {
      EV.store.push('user_sms_'+opts.userId, record);
    }
    return record;
  }
};

// ===================== AUTH =====================
EV.auth = {
  register: function(data) {
    var users = EV.store.get('users', []);
    var existing = users.find(function(u){return u.email===data.email;});
    if (existing) return {ok:false, msg:'Email already registered'};
    var user = {
      id: 'U'+Date.now(),
      firstName: data.firstName, lastName: data.lastName,
      email: data.email, phone: data.phone, password: data.password,
      country: data.country, lang: data.lang || getCurrentLang(),
      kycStatus: 'pending', accountStatus: 'pending', // NEW: accounts start pending
      riskProfile: data.riskProfile || 'balanced',
      investorType: data.investorType || 'retail',
      // KYC details
      idType: data.idType||'', idNumber: data.idNumber||'',
      dob: data.dob||'', taxResidency: data.taxResidency||'',
      address: data.address||'', city: data.city||'', postalCode: data.postalCode||'',
      // Investor profile
      experience: data.experience||'', income: data.income||'',
      objective: data.objective||'', horizon: data.horizon||'',
      // NEW: Bank account verification
      bankName: data.bankName||'', accountHolder: data.accountHolder||'',
      iban: data.iban||'', bic: data.bic||'', accountNumber: data.accountNumber||'',
      bankCountry: data.bankCountry||data.country||'',
      // Compliance
      pep: data.pep||false, sanctions: data.sanctions||false, aml: data.aml||false,
      // SMS opt-in
      smsOptIn: data.smsOptIn||false,
      createdAt: new Date().toISOString(),
      balance: 0, invested: 0, pl: 0,
      portfolio: [], transactions: [], messages: [],
      verified: false
    };
    users.push(user);
    EV.store.set('users', users);
    // Send acknowledgment email to user
    EV.mail.send(user.email,
      'Account Submission Received — EuroVest',
      'Dear '+user.firstName+' '+user.lastName+',\n\nThank you for submitting your account application to EuroVest. We have received your registration details, identity information, and bank account verification.\n\nYour account is currently under review by our compliance team. This process typically takes 1-2 business days. During this time, our team will verify your identity documents and bank account details in accordance with European AML/KYC regulations.\n\nWhat happens next:\n1. Our compliance team reviews your submission\n2. You will receive an email once your account is approved\n3. Upon approval, you can make your first deposit and start investing\n\nIf we need any additional information, we will contact you via email and your dashboard.\n\nYou can track your account status by logging into your dashboard.\n\nThank you for choosing EuroVest.\n\nBest regards,\nThe EuroVest Compliance Team\nEuroVest SAS — France & Italy',
      {type:'account_acknowledgment', userId:user.id});
    // Send SMS acknowledgment if opted in
    if (user.smsOptIn && user.phone) {
      EV.mail.sendSMS(user.phone,
        'EuroVest: Account submission received. Your application is under review. You will be notified once approved. Track status in your dashboard.',
        {type:'account_acknowledgment', userId:user.id});
    }
    // Notify admin
    EV.store.push('admin_notifications', {
      id: Date.now(), type:'registration', time: new Date().toISOString(),
      userId: user.id, userName: user.firstName+' '+user.lastName,
      text: 'New account registration: '+user.firstName+' '+user.lastName+' ('+user.email+') — Status: PENDING review',
      read: false
    });
    // Also email admin
    EV.mail.send('admin@eurovest.eu',
      'New Account Registration — '+user.firstName+' '+user.lastName,
      'A new user has registered:\n\nName: '+user.firstName+' '+user.lastName+'\nEmail: '+user.email+'\nPhone: '+user.phone+'\nCountry: '+user.country+'\nBank: '+user.bankName+' (IBAN: '+user.iban+')\n\nAccount status: PENDING\nPlease review in the admin dashboard → User Management.',
      {type:'admin_registration_alert'});
    return {ok:true, user:user};
  },
  login: function(email, password) {
    var users = EV.store.get('users', []);
    var admin = EV.store.get('admin', {email:'admin@eurovest.eu', password:'admin123'});
    if (email===admin.email && password===admin.password) {
      EV.store.set('admin_session', {email:admin.email, time:Date.now()});
      return {ok:true, role:'admin'};
    }
    var user = users.find(function(u){return u.email===email && u.password===password;});
    if (!user) return {ok:false, msg:'Invalid email or password'};
    if (user.accountStatus==='suspended') return {ok:false, msg:'Account suspended. Contact support.'};
    EV.store.set('session', {userId:user.id, time:Date.now()});
    return {ok:true, role:'user', user:user};
  },
  logout: function() {
    EV.store.set('session', null);
    EV.store.set('admin_session', null);
    window.location.href = '../index.html';
  },
  currentUser: function() {
    var sess = EV.store.get('session');
    if (!sess) return null;
    var users = EV.store.get('users', []);
    return users.find(function(u){return u.id===sess.userId;}) || null;
  },
  isAdmin: function() {
    return !!EV.store.get('admin_session');
  },
  updateUser: function(userId, updates) {
    var users = EV.store.get('users', []);
    var idx = users.findIndex(function(u){return u.id===userId;});
    if (idx>=0) { users[idx] = Object.assign(users[idx], updates); EV.store.set('users', users); return users[idx]; }
    return null;
  },
  // Admin approves a pending account
  approveAccount: function(userId) {
    var user = this.updateUser(userId, {accountStatus:'active', kycStatus:'verified', verified:true});
    if (user) {
      EV.mail.send(user.email,
        'Account Approved — Welcome to EuroVest!',
        'Dear '+user.firstName+' '+user.lastName+',\n\nGreat news! Your EuroVest account has been approved and is now fully active.\n\nYou can now:\n• Make deposits via SEPA, card, or open banking\n• Invest in any of our portfolios and products\n• Request withdrawals to your verified bank account\n• Access all platform features\n\nLog in to your dashboard to get started →\n\nWelcome aboard!\nThe EuroVest Team',
        {type:'account_approved', userId:user.id});
      if (user.smsOptIn && user.phone) {
        EV.mail.sendSMS(user.phone, 'EuroVest: Your account has been approved! You can now deposit and invest. Log in to your dashboard to get started.', {type:'account_approved', userId:user.id});
      }
      EV.store.push('admin_notifications', {
        id: Date.now(), type:'account_approved', time: new Date().toISOString(),
        userId: user.id, userName: user.firstName+' '+user.lastName,
        text: 'Account approved: '+user.firstName+' '+user.lastName+' ('+user.email+')',
        read: false
      });
    }
    return user;
  },
  resetPassword: function(email, newPassword) {
    var users = EV.store.get('users', []);
    var idx = users.findIndex(function(u){return u.email===email;});
    if (idx<0) return {ok:false, msg:'Email not found'};
    users[idx].password = newPassword;
    EV.store.set('users', users);
    // Notify user of password change
    EV.mail.send(email, 'Password Changed — EuroVest',
      'Dear '+users[idx].firstName+',\n\nYour EuroVest account password has been successfully changed.\n\nIf you did not make this change, please contact support immediately.\n\nBest regards,\nThe EuroVest Security Team',
      {type:'password_change', userId:users[idx].id});
    // Notify admin
    EV.store.push('admin_notifications', {
      id: Date.now(), type:'password_reset', time: new Date().toISOString(),
      userName: users[idx].firstName+' '+users[idx].lastName,
      text: 'Password reset by '+users[idx].email, read:false
    });
    return {ok:true};
  },
  resetAdminPassword: function(newPassword) {
    var admin = EV.store.get('admin', {email:'admin@eurovest.eu', password:'admin123'});
    admin.password = newPassword;
    EV.store.set('admin', admin);
    return {ok:true};
  }
};

// ===================== NOTIFICATIONS =====================
EV.notify = {
  trackVisit: function() {
    var visits = EV.store.get('visits', []);
    var visit = {
      id: Date.now(), time: new Date().toISOString(),
      ip: 'visitor-'+Math.random().toString(36).slice(2,8),
      page: window.location.pathname.split('/').pop() || 'index.html',
      lang: getCurrentLang()
    };
    visits.push(visit);
    if (visits.length > 500) visits = visits.slice(-500);
    EV.store.set('visits', visits);
    EV.store.push('admin_notifications', {
      id: Date.now(), type:'visit', time: visit.time,
      text: 'New visitor on '+visit.page+' ('+visit.lang.toUpperCase()+')',
      read: false
    });
    // Email admin about visit (first visit per session only)
    if (!sessionStorage.getItem('ev_visit_logged')) {
      sessionStorage.setItem('ev_visit_logged','1');
      EV.mail.send('admin@eurovest.eu', 'New Website Visit',
        'A new visitor has arrived on the EuroVest platform.\n\nPage: '+visit.page+'\nLanguage: '+visit.lang.toUpperCase()+'\nTime: '+new Date().toLocaleString()+'\n\nThis is an automated notification.',
        {type:'admin_visit_alert'});
    }
  },
  deposit: function(userId, amount, method) {
    var user = EV.auth.currentUser() || EV.store.get('users',[]).find(function(u){return u.id===userId;});
    var userName = user ? user.firstName+' '+user.lastName : 'Unknown';
    EV.store.push('admin_notifications', {
      id: Date.now(), type:'deposit', time: new Date().toISOString(),
      userId: userId, userName: userName,
      text: 'Deposit request: €'+amount+' via '+method+' by '+(user?user.email:''),
      read: false, amount: amount
    });
    // Email admin
    EV.mail.send('admin@eurovest.eu', 'Deposit Alert — €'+amount+' by '+userName,
      'A deposit has been initiated:\n\nUser: '+userName+'\nEmail: '+(user?user.email:'')+'\nAmount: €'+amount+'\nMethod: '+method+'\nTime: '+new Date().toLocaleString()+'\n\nReview in admin dashboard.',
      {type:'admin_deposit_alert'});
    // Notify user via email + dashboard
    if (user) {
      EV.mail.send(user.email, 'Deposit Received — €'+amount,
        'Dear '+user.firstName+',\n\nWe have received your deposit request of €'+amount+' via '+method+'.\n\nYour funds will be credited to your account within 1-2 business days. You will receive a transaction receipt once processing is complete.\n\nThank you for investing with EuroVest.\n\nThe EuroVest Team',
        {type:'deposit_confirmation', userId:user.id});
      if (user.smsOptIn && user.phone) {
        EV.mail.sendSMS(user.phone, 'EuroVest: Deposit of €'+amount+' received via '+method+'. Processing within 1-2 business days.', {type:'deposit_confirmation', userId:user.id});
      }
    }
  },
  withdraw: function(userId, amount) {
    var user = EV.auth.currentUser() || EV.store.get('users',[]).find(function(u){return u.id===userId;});
    var userName = user ? user.firstName+' '+user.lastName : 'Unknown';
    EV.store.push('admin_notifications', {
      id: Date.now(), type:'withdraw', time: new Date().toISOString(),
      userId: userId, userName: userName,
      text: 'Withdrawal request: €'+amount+' by '+(user?user.email:''),
      read: false, amount: amount
    });
    // Email admin
    EV.mail.send('admin@eurovest.eu', 'Withdrawal Alert — €'+amount+' by '+userName,
      'A withdrawal has been requested:\n\nUser: '+userName+'\nEmail: '+(user?user.email:'')+'\nAmount: €'+amount+'\nTime: '+new Date().toLocaleString()+'\n\nReview and process in admin dashboard.',
      {type:'admin_withdrawal_alert'});
    // Notify user
    if (user) {
      EV.mail.send(user.email, 'Withdrawal Request Received — €'+amount,
        'Dear '+user.firstName+',\n\nWe have received your withdrawal request for €'+amount+'.\n\nYour withdrawal is now going through compliance checks and will be processed within 3-5 business days. Funds will be transferred to your verified bank account ('+user.iban+').\n\nYou will receive a confirmation receipt once the transfer is complete.\n\nThe EuroVest Team',
        {type:'withdrawal_confirmation', userId:user.id});
      if (user.smsOptIn && user.phone) {
        EV.mail.sendSMS(user.phone, 'EuroVest: Withdrawal of €'+amount+' received. Processing within 3-5 business days to your bank account.', {type:'withdrawal_confirmation', userId:user.id});
      }
    }
  },
  supportMessage: function(userId, userName, message, aiHandled) {
    EV.store.push('admin_notifications', {
      id: Date.now(), type:'support', time: new Date().toISOString(),
      userId: userId, userName: userName,
      text: 'Support message from '+userName+': "'+message.substring(0,60)+(message.length>60?'...':'')+'" — '+(aiHandled?'AI handling':'Needs human reply'),
      read: false, aiHandled: aiHandled
    });
    // Email admin — notify that AI is responding OR escalation needed
    EV.mail.send('admin@eurovest.eu',
      aiHandled ? 'AI Support Active — '+userName : 'Support Escalation Needed — '+userName,
      aiHandled
        ? 'The AI support assistant is currently responding to a user query.\n\nUser: '+userName+'\nMessage: "'+message+'"\n\nThe AI is handling this question. You can join the conversation in the admin dashboard → Support Inbox if you wish to intervene.\n\nThis is an automated notification.'
        : 'A user question has been escalated to human support — the AI could not answer it.\n\nUser: '+userName+'\nMessage: "'+message+'"\n\nPlease log in to the admin dashboard → Support Inbox and reply to this user.\n\nThis requires your immediate attention.',
      {type: aiHandled?'admin_ai_alert':'admin_escalation_alert'});
  },
  // Generic activity notification — any user activity notifies admin + user
  activity: function(userId, activityType, description) {
    var user = EV.store.get('users',[]).find(function(u){return u.id===userId;});
    var userName = user ? user.firstName+' '+user.lastName : 'Unknown';
    // Admin notification
    EV.store.push('admin_notifications', {
      id: Date.now(), type:activityType, time: new Date().toISOString(),
      userId: userId, userName: userName,
      text: description, read:false
    });
    // Email admin
    EV.mail.send('admin@eurovest.eu', 'User Activity — '+activityType+' — '+userName,
      'User activity notification:\n\nUser: '+userName+'\nEmail: '+(user?user.email:'')+'\nActivity: '+activityType+'\nDetails: '+description+'\nTime: '+new Date().toLocaleString(),
      {type:'admin_activity_alert'});
  },
  toast: function(title, msg, type) {
    var wrap = document.querySelector('.toast-wrap');
    if (!wrap) { wrap = document.createElement('div'); wrap.className='toast-wrap'; document.body.appendChild(wrap); }
    var icons = {success:'✅',danger:'❌',warning:'⚠️',info:'ℹ️'};
    var el = document.createElement('div');
    el.className = 'toast '+(type||'info');
    el.innerHTML = '<div class="toast-icon">'+(icons[type]||'ℹ️')+'</div><div class="toast-content"><h5>'+title+'</h5><p>'+msg+'</p></div>';
    wrap.appendChild(el);
    setTimeout(function(){ el.style.opacity='0'; el.style.transform='translateX(100%)'; setTimeout(function(){el.remove();},300); }, 4000);
  }
};

// ===================== AI SUPPORT =====================
EV.ai = {
  kb: {
    deposit: {
      en: "To deposit funds, go to your Dashboard → Deposit. We support SEPA bank transfer, card payments, and open banking. Funds typically appear within 1-2 business days for SEPA transfers.",
      fr: "Pour déposer des fonds, allez dans votre Tableau de bord → Dépôt. Nous acceptons les virements SEPA, les paiements par carte et la banque ouverte. Les fonds apparaissent généralement sous 1-2 jours ouvrés.",
      it: "Per depositare fondi, vai su Dashboard → Deposito. Accettiamo bonifico SEPA, carta e open banking. I fondi arrivano in 1-2 giorni lavorativi.",
    },
    withdraw: {
      en: "To withdraw funds, go to Dashboard → Withdraw. Enter the amount and select your bank account. Withdrawals go through compliance checks and are processed within 3-5 business days.",
      fr: "Pour retirer des fonds, allez dans Tableau de bord → Retrait. Saisissez le montant et sélectionnez votre compte bancaire. Les retraits passent par des contrôles de conformité (3-5 jours ouvrés).",
      it: "Per prelevare, vai su Dashboard → Prelievo. Inserisci l'importo e seleziona il conto. I prelievi sono verificati per conformità (3-5 giorni lavorativi).",
    },
    investments: {
      en: "We offer stocks, ETFs, government bonds (French OAT & Italian BTP), corporate bonds, real estate funds (SCPI), ESG/sustainable investments, private equity, commodities, cryptoassets, retirement products (PER), and cash/savings (Livret A, LDDS).",
      fr: "Nous proposons des actions, des ETF, des obligations d'État (français et BTP italiens), des obligations d'entreprises, de l'immobilier, de l'ESG, du private equity, des matières premières, des cryptoactifs, des produits de retraite et de l'épargne.",
      it: "Offriamo azioni, ETF, BTP, obbligazioni corporate, immobiliare, ESG, private equity, materie prime, criptoasset, pensione e risparmio.",
    },
    loans: {
      en: "We offer a full range of loan options: personal loans, mortgages, auto loans, business loans, student loans, debt consolidation loans, home equity loans, bridge loans, equipment financing, revolving credit lines, green energy loans, and medical loans. Visit our Loans page or Dashboard → Loans to apply.",
      fr: "Nous proposons une gamme complète de prêts : personnel, hypothécaire, automobile, professionnel, étudiant, consolidation de dettes, et plus. Visitez notre page Prêts.",
      it: "Offriamo prestiti personali, mutui, auto, business, studenteschi, consolidamento debiti e altro. Visita la pagina Prestiti.",
    },
    password: {
      en: "To reset your password, click 'Sign In' then 'Forgot Password'. Enter your email and you'll receive reset instructions. You can also change it anytime in Dashboard → Settings.",
      fr: "Pour réinitialiser votre mot de passe, cliquez sur 'Connexion' puis 'Mot de passe oublié'. Saisissez votre e-mail pour recevoir les instructions.",
      it: "Per reimpostare la password, clicca 'Accedi' poi 'Password dimenticata'. Inserisci la email per ricevere le istruzioni.",
    },
    kyc: {
      en: "Identity verification (KYC) requires a government ID, selfie/liveness check, and address verification. Go to Dashboard → Settings to complete or check your verification status.",
      fr: "La vérification d'identité (KYC) nécessite une pièce d'identité, un selfie et un justificatif de domicile. Voir Tableau de bord → Paramètres.",
      it: "La verifica d'identità (KYC) richiede documento, selfie e prova di indirizzo. Vedi Dashboard → Impostazioni.",
    },
    fees: {
      en: "Our fees are transparent: management fees range from 0.45% to 1.45% depending on portfolio. No deposit fees for SEPA. See our Fees page for full details.",
      fr: "Nos frais sont transparents : 0,25 % de frais annuels, aucun frais de dépôt, 0,50 € par retrait SEPA. Les frais produits varient.",
      it: "Le nostre commissioni sono trasparenti: 0,25% annuale, nessun costo di deposito, 0,50€ per prelievo SEPA.",
    },
    account_status: {
      en: "New accounts start in 'pending' status while our compliance team verifies your identity and bank account. This typically takes 1-2 business days. You'll receive an email once approved.",
      fr: "Les nouveaux comptes sont en statut 'en attente' pendant la vérification. Comptez 1-2 jours ouvrés. Vous recevrez un e-mail une fois approuvé.",
      it: "I nuovi conti sono 'in sospeso' durante la verifica (1-2 giorni lavorativi). Riceverai un'email all'approvazione.",
    }
  },
  patterns: [
    {keys:['deposit','add money','fund','deposer','déposer','deposito','depositare','einzahl','إيداع','存款','депозит','जमा'], topic:'deposit'},
    {keys:['withdraw','cash out','take money','retirer','retrait','prelev','prelievo','auszahl','سحب','取款','вывод','निकासी'], topic:'withdraw'},
    {keys:['loan','borrow','credit','mortgage','prêt','prestito','mutuo','kredit','قرض','贷款','кредит','क़र्ज़'], topic:'loans'},
    {keys:['invest','product','stock','etf','bond','crypto','portfolio','investir','investire','investier','استثمار','投资','инвест','निवेश'], topic:'investments'},
    {keys:['password','reset','forgot','login','mot de passe','passwort','كلمة المرور','密码','пароль','पासवर्ड'], topic:'password'},
    {keys:['kyc','verify','identity','verification','identité','identità','identität','تحقق','验证','верифика','सत्यापन'], topic:'kyc'},
    {keys:['fee','cost','charge','frais','commission','gebühr','رسوم','费用','комисс','शुल्क'], topic:'fees'},
    {keys:['pending','status','approved','account status','en attente','in attesa','بانتظار','待定','ожида','लंबित'], topic:'account_status'},
  ],
  respond: function(message, lang) {
    lang = lang || getCurrentLang();
    var lower = message.toLowerCase();
    for (var i=0; i<this.patterns.length; i++) {
      var p = this.patterns[i];
      for (var j=0; j<p.keys.length; j++) {
        if (lower.indexOf(p.keys[j]) >= 0) {
          var resp = this.kb[p.topic];
          return {text: resp[lang]||resp.en, topic:p.topic, aiHandled:true};
        }
      }
    }
    return {text:null, topic:'escalate', aiHandled:false};
  },
  escalationMsg: {
    en: "I'd like to connect you with one of our human agents who can help with this specific question. They've been notified and will respond shortly. Is there anything else I can help with in the meantime?",
    fr: "Je vais vous mettre en relation avec l'un de nos conseillers. Il a été notifié et répondra rapidement. Puis-je vous aider sur autre chose en attendant ?",
    it: "Ti metto in contatto con un nostro operatore. È stato notificato e risponderà a breve. Posso aiutarti con altro nel frattempo?",
  }
};

// ===================== MESSAGING =====================
EV.msg = {
  adminSend: function(target, subject, body, opts) {
    opts = opts || {};
    var users = EV.store.get('users', []);
    var msgs = EV.store.get('admin_messages', []);
    var recipients = [];
    if (target==='all') {
      recipients = users;
    } else {
      // target can be a comma-separated list of user IDs
      var ids = target.split(',');
      recipients = users.filter(function(u){return ids.indexOf(u.id)>=0;});
    }
    recipients.forEach(function(user){
      // Personalize body with {name}
      var personalizedBody = body.replace(/{name}/g, user.firstName+' '+user.lastName);
      var personalizedSubject = subject.replace(/{name}/g, user.firstName);
      var msg = {
        id: 'M'+Date.now()+'-'+user.id,
        userId: user.id, userEmail: user.email,
        subject: personalizedSubject, body: personalizedBody,
        time: new Date().toISOString(),
        read: false, direction: 'admin-to-user',
        originalLang: 'en',
        template: opts.template || null,
        isMotivational: opts.isMotivational || false
      };
      msgs.push(msg);
      var umsgs = EV.store.get('user_messages_'+user.id, []);
      umsgs.push(msg);
      EV.store.set('user_messages_'+user.id, umsgs);
      // Send email
      EV.mail.send(user.email, personalizedSubject, personalizedBody,
        {type: opts.isMotivational?'motivational_email':'admin_message', userId:user.id, template:opts.template});
      // Send SMS if opted in
      if (user.smsOptIn && user.phone) {
        EV.mail.sendSMS(user.phone,
          'EuroVest: You have a new message — "'+personalizedSubject+'". Check your dashboard or email for details.',
          {type:'message_notification', userId:user.id});
      }
    });
    EV.store.set('admin_messages', msgs);
    // Notify admin of sent message
    EV.store.push('admin_notifications', {
      id: Date.now(), type:'message_sent', time:new Date().toISOString(),
      text: 'Message sent to '+recipients.length+' user(s): "'+subject+'"',
      read:false
    });
    return {ok:true, count: recipients.length};
  },
  userToSupport: function(userId, message) {
    var user = EV.auth.currentUser() || EV.store.get('users',[]).find(function(u){return u.id===userId;});
    var userName = user ? user.firstName+' '+user.lastName : 'Visitor';
    var userLang = user ? user.lang : getCurrentLang();
    var ticket = {
      id: 'T'+Date.now(), userId: userId, userName: userName,
      userEmail: user?user.email:'', userPhone: user?user.phone:'', lang: userLang,
      message: message, time: new Date().toISOString(),
      status: 'open', replies: [],
      aiHandled: false, escalated: false
    };
    var aiResp = EV.ai.respond(message, userLang);
    if (aiResp.aiHandled) {
      ticket.aiHandled = true;
      ticket.replies.push({from:'ai', text: aiResp.text, time: new Date().toISOString()});
      EV.notify.supportMessage(userId, userName, message, true);
    } else {
      ticket.escalated = true;
      ticket.replies.push({from:'ai', text: EV.ai.escalationMsg[userLang]||EV.ai.escalationMsg.en, time: new Date().toISOString()});
      EV.notify.supportMessage(userId, userName, message, false);
    }
    EV.store.push('support_tickets', ticket);
    var uh = EV.store.get('user_support_'+userId, []);
    uh.push(ticket);
    EV.store.set('user_support_'+userId, uh);
    // Email user confirmation that their message was received
    if (user) {
      EV.mail.send(user.email, 'Support Message Received — EuroVest',
        'Dear '+user.firstName+',\n\nWe have received your support message:\n\n"'+message+'"\n\n'+(aiResp.aiHandled?'Our AI assistant has provided an initial response. If you need further assistance, our team is ready to help.':'Your question has been escalated to our human support team. They have been notified and will respond shortly.')+'\n\nYou can track this conversation in your dashboard → Support.\n\nThe EuroVest Support Team',
        {type:'support_confirmation', userId:user.id});
    }
    return ticket;
  },
  adminReply: function(ticketId, reply) {
    var tickets = EV.store.get('support_tickets', []);
    var idx = tickets.findIndex(function(t){return t.id===ticketId;});
    if (idx>=0) {
      tickets[idx].replies.push({from:'admin', text:reply, time:new Date().toISOString()});
      tickets[idx].status = 'answered';
      EV.store.set('support_tickets', tickets);
      var t = tickets[idx];
      var uh = EV.store.get('user_support_'+t.userId, []);
      var uidx = uh.findIndex(function(x){return x.id===ticketId;});
      if (uidx>=0) { uh[uidx] = t; EV.store.set('user_support_'+t.userId, uh); }
      // Email the user the reply
      var user = EV.store.get('users',[]).find(function(u){return u.id===t.userId;});
      if (user) {
        EV.mail.send(user.email, 'Support Reply — EuroVest',
          'Dear '+user.firstName+',\n\nYou have received a reply from our support team regarding your message:\n\n"'+t.message+'"\n\nOur reply:\n"'+reply+'"\n\nYou can continue the conversation in your dashboard → Support.\n\nThe EuroVest Support Team',
          {type:'support_reply', userId:user.id});
        if (user.smsOptIn && user.phone) {
          EV.mail.sendSMS(user.phone, 'EuroVest: Support team has replied to your message. Check your dashboard or email.', {type:'support_reply', userId:user.id});
        }
      }
      return {ok:true};
    }
    return {ok:false};
  }
};

// ===================== TRANSACTIONS =====================
EV.tx = {
  generate: function(userId, opts) {
    var types = ['deposit','withdrawal','purchase','sale','dividend','interest','fee','loan_disbursement','loan_repayment','portfolio_investment','portfolio_rebalance'];
    var type = opts.type || types[Math.floor(Math.random()*types.length)];
    var amount = opts.amount || (Math.random()*5000+100);
    var date = opts.date || this.randomDate();
    var ref = 'EV-'+Date.now().toString(36).toUpperCase()+Math.random().toString(36).slice(2,6).toUpperCase();
    var tx = {
      id: ref, userId: userId, type: type,
      amount: parseFloat(amount.toFixed(2)), currency:'EUR',
      date: date, status: opts.status || 'completed',
      method: opts.method || (type==='deposit'?'SEPA Transfer':type==='withdrawal'?'Bank Transfer':type.indexOf('loan')>=0?'Bank Transfer':'Platform'),
      description: opts.description || this.descForType(type),
      reference: ref,
      receiptData: this.generateReceiptData(type, amount, date, ref)
    };
    var txs = EV.store.get('user_tx_'+userId, []);
    txs.push(tx);
    txs.sort(function(a,b){return new Date(b.date)-new Date(a.date);});
    EV.store.set('user_tx_'+userId, txs);
    EV.store.push('all_transactions', tx);
    return tx;
  },
  generateBulk: function(userId, count, opts) {
    var results = [];
    for (var i=0; i<count; i++) {
      var o = Object.assign({}, opts);
      if (!opts.date) o.date = this.randomDate();
      if (!opts.amount) o.amount = Math.random()*5000+50;
      results.push(this.generate(userId, o));
    }
    return results;
  },
  randomDate: function() {
    var now = new Date();
    var past = new Date(now.getFullYear()-3, 0, 1);
    var diff = now - past;
    var rand = Math.random()*diff;
    return new Date(past.getTime()+rand).toISOString();
  },
  descForType: function(type) {
    var descs = {
      deposit:['SEPA Credit Transfer In','Bank Deposit','Funds Received via Card','Open Banking Deposit','Wire Transfer Received'],
      withdrawal:['Withdrawal to Bank Account','SEPA Transfer Out','Funds Withdrawn','Bank Transfer Out'],
      purchase: EV.catalog.products.map(function(p){return 'Purchase: '+p;}),
      sale: EV.catalog.products.map(function(p){return 'Sale: '+p;}),
      dividend:['Dividend Payment: European Equities','Dividend Payment: Real Estate Fund','Quarterly Dividend Distribution','Dividend: European Dividend Fund','Dividend: CAC 40 Companies','Dividend: FTSE MIB Companies'],
      interest:['Interest Payment: Fixed Income','Bond Coupon Payment: BTP Italia','Bond Coupon: French OAT','Savings Interest Credit: Livret A','Interest: LDDS Savings','Coupon: Green Bond Fund'],
      fee:['Platform Management Fee','Transaction Fee','Withdrawal Processing Fee','Annual Custody Fee','Portfolio Rebalancing Fee'],
      loan_disbursement: EV.catalog.loanTypes.map(function(l){return 'Loan Disbursement: '+l;}),
      loan_repayment: EV.catalog.loanTypes.map(function(l){return 'Loan Repayment: '+l;}),
      portfolio_investment: EV.catalog.portfolios.map(function(p){return 'Investment: '+p;}),
      portfolio_rebalance: EV.catalog.portfolios.map(function(p){return 'Rebalance: '+p;})
    };
    var arr = descs[type]||['Platform Transaction'];
    return arr[Math.floor(Math.random()*arr.length)];
  },
  generateReceiptData: function(type, amount, date, ref) {
    return {
      institution: 'EUROVEST INVESTMENT PLATFORM',
      institutionSub: 'Regulated European Investment Services',
      reference: ref,
      type: type.charAt(0).toUpperCase()+type.slice(1).replace(/_/g,' '),
      amount: parseFloat(amount.toFixed(2)),
      currency: 'EUR',
      date: date,
      status: 'COMPLETED',
      accountHolder: '',
      accountNumber: 'EU'+Math.floor(Math.random()*9000000000+1000000000),
      iban: this.genIBAN(),
      bic: 'EURVFRPP'+Math.floor(Math.random()*900+100),
      processingCode: 'PC'+Math.random().toString(36).slice(2,10).toUpperCase(),
      authCode: Math.floor(Math.random()*900000+100000).toString(),
      settlementDate: date,
      timestamp: new Date(date).toLocaleString('en-GB'),
    };
  },
  genIBAN: function() {
    var cc = ['FR','IT','DE','ES','PT'];
    var c = cc[Math.floor(Math.random()*cc.length)];
    var num = '';
    for (var i=0;i<22;i++) num+=Math.floor(Math.random()*10);
    return c+num;
  }
};

// ===================== UTILITIES =====================
EV.util = {
  formatDate: function(iso) {
    return new Date(iso).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'});
  },
  formatDateTime: function(iso) {
    return new Date(iso).toLocaleString('en-GB',{day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'});
  },
  formatMoney: function(amt) {
    return '€'+Number(amt).toLocaleString('en-GB',{minimumFractionDigits:2,maximumFractionDigits:2});
  },
  timeAgo: function(iso) {
    var diff = Date.now() - new Date(iso).getTime();
    var mins = Math.floor(diff/60000);
    if (mins<1) return 'just now';
    if (mins<60) return mins+'m ago';
    var hrs = Math.floor(mins/60);
    if (hrs<24) return hrs+'h ago';
    var days = Math.floor(hrs/24);
    return days+'d ago';
  },
  genId: function(prefix) { return (prefix||'ID')+Date.now().toString(36)+Math.random().toString(36).slice(2,5); }
};

// ===================== INIT =====================
EV.init = function() {
  EV.notify.trackVisit();
  if (typeof applyTranslations === 'function') applyTranslations();
  EV.buildLangDropdown();
};

EV.buildLangDropdown = function() {
  var btns = document.querySelectorAll('.lang-btn');
  btns.forEach(function(btn){
    btn.onclick = function(e) {
      e.stopPropagation();
      var dd = btn.parentElement.querySelector('.lang-dropdown');
      if (dd) dd.classList.toggle('open');
    };
  });
  document.addEventListener('click', function(){
    document.querySelectorAll('.lang-dropdown.open').forEach(function(d){d.classList.remove('open');});
  });
  document.querySelectorAll('.lang-dropdown').forEach(function(dd){
    if (dd.children.length === 0) {
      LANGS.forEach(function(l){
        var opt = document.createElement('div');
        opt.className = 'lang-option';
        opt.innerHTML = '<span>'+l.flag+'</span><span>'+l.name+'</span>';
        opt.onclick = function(e) {
          e.stopPropagation();
          setCurrentLang(l.code);
          dd.classList.remove('open');
          applyTranslations(l.code);
        };
        dd.appendChild(opt);
      });
    }
  });
};

if (document.readyState !== 'loading') EV.init();
else document.addEventListener('DOMContentLoaded', EV.init);
