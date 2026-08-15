// ============================================================
// questions.js — the actual MIL quiz question bank.
//
// Plain script (no ES modules), wrapped in an IIFE so internals
// stay private. Attaches window.MIL.QUESTIONS: an object keyed by
// category id (matching CATEGORIES in cards.js), each holding an
// array of { question, options[4], correctIndex, explanation }.
//
// Sourced from ENGLISH_-_MIL_QUESTION_FIX1.docx. The document's
// five themes map onto the wheel's four colour categories as:
//   Theme 1 "AI Language and AI Hallucinations"        -> ai-lang
//   Theme 2 "Misinformation"                            -> mi
//   Theme 3 "Deepfake and Digital Hoax"                 -> deepfake (part 1)
//   Theme 4 "Deepfake and Detection Visualization of AI"-> deepfake (part 2)
//   Theme 5 "Ice Breaking"                               -> icbr
// ============================================================
window.MIL = window.MIL || {};

(function () {
  const QUESTIONS = {
    // ---------------------------------------------------------
    // GREEN — AI Language and AI Hallucinations (Theme 1)
    // ---------------------------------------------------------
    'ai-lang': [
      {
        question: 'Why can AI Chatbots (like ChatGPT or Gemini) provide false information but convey it in a very confident and convincing language?',
        options: [
          'Because AI always knows everything.',
          'Because AI works by predicting the closest word patterns, not by understanding facts like humans.',
          'Because AI wants to make people believe false information.',
          'Because AI checks every answer with a teacher.',
        ],
        correctIndex: 1,
        explanation: 'AI chatbots generate text by predicting the most likely next word based on patterns in their training data — they don\u2019t "know" or verify facts the way humans do, so a confident tone is no guarantee of accuracy.',
      },
      {
        question: 'What are the best steps if you use AI to help with research, article writing, or school/college assignments?',
        options: [
          'Copy everything from AI without checking.',
          'Trust AI because it usually sounds confident.',
          'Verify every fact, figure, and journal reference provided by AI to its original source.',
          'Only check the answer if it looks strange.',
        ],
        correctIndex: 2,
        explanation: 'AI can "hallucinate" plausible-sounding facts, quotes, and citations that don\u2019t actually exist, so treat AI output as a first draft and always trace claims back to a real source.',
      },
      {
        question: 'The term for instructions, directions, or text questions that a user gives to an AI system is called...',
        options: ['Command', 'Prompt', 'Answer', 'Search'],
        correctIndex: 1,
        explanation: 'The input you type to an AI model — instructions, questions, or context — is called a "prompt". How you write it strongly shapes the quality of the AI\u2019s response.',
      },
      {
        question: 'Do current AI models have emotions, personal awareness (sentience), and genuine feelings?',
        options: [
          'Yes, AI feels happy when people use it.',
          'Yes, AI has real feelings like humans.',
          'No, AI is just a mathematical computer program that processes data and mimics human language patterns.',
          'No, but AI can feel emotions when it learns enough information.',
        ],
        correctIndex: 2,
        explanation: 'Today\u2019s AI models are statistical pattern-matchers trained on huge amounts of text. They can imitate emotional language convincingly, but there\u2019s no evidence they actually experience feelings or awareness.',
      },
      {
        question: 'What are the most effective techniques for AI to provide more accurate answers and reduce the risk of hallucinations?',
        options: [
          'Give the AI very short and unclear instructions.',
          'Let AI answer without giving any background information.',
          'Provide specific context, instruct role boundaries, and ask the AI to demonstrate its reasoning steps.',
          'Ask AI to always give the fastest answer.',
        ],
        correctIndex: 2,
        explanation: 'Clear context, well-defined boundaries, and asking the model to explain its reasoning all give AI less room to guess — which meaningfully cuts down on confidently-wrong answers.',
      },
    ],

    // ---------------------------------------------------------
    // BLUE — Misinformation (Theme 2)
    // ---------------------------------------------------------
    'mi': [
      {
        question: 'What is the main difference between Misinformation and Disinformation?',
        options: [
          'Misinformation is always shared by the government, while disinformation is shared by students.',
          'Misinformation is false information spread without malicious intent, while disinformation is deliberately created to mislead.',
          'Misinformation is true information, while disinformation is always a joke.',
          'Misinformation and disinformation have exactly the same meaning.',
        ],
        correctIndex: 1,
        explanation: 'The key difference is intent: misinformation is false info shared by someone who genuinely (if mistakenly) believes it\u2019s true, while disinformation is deliberately fabricated to deceive.',
      },
      {
        question: 'News headlines that are deliberately made sensational, bombastic, and provoke emotions/curiosity but the content of the news does not match are called...',
        options: ['Echo Chamber', 'Fact-Checking', 'Clickbait', 'Misinformation'],
        correctIndex: 2,
        explanation: 'Clickbait headlines are engineered to trigger curiosity or outrage so you click — often over-promising something the actual article doesn\u2019t deliver.',
      },
      {
        question: 'The phenomenon where someone only consumes information that is in accordance with their beliefs/opinions on social media is called...',
        options: ['Clickbait', 'Echo Chamber', 'Fact-Checking', 'Digital Safety'],
        correctIndex: 1,
        explanation: 'An echo chamber forms when algorithms (and our own choices) keep showing us content that agrees with what we already believe, making opposing views feel rare or wrong.',
      },
      {
        question: 'What is the main function of independent Fact-Checking sites such as TurnBackHoax.id or Cekfakta.com?',
        options: [
          'To create funny news for social media.',
          'To make viral information more popular.',
          'To verify the truth of claims, rumors, or viral issues circulating widely in society.',
          'To make people believe everything they see online.',
        ],
        correctIndex: 2,
        explanation: 'Independent fact-checkers investigate viral claims against evidence and primary sources, then publish verdicts to help the public tell truth from hoax.',
      },
      {
        question: 'The most appropriate simple slogan to apply before sharing information or chain messages on social media is...',
        options: ['"Share Everything!"', '"Believe Before Sharing!"', '"Filter Before Sharing"', '"Share Before Thinking!"'],
        correctIndex: 2,
        explanation: '"Filter before sharing" is a simple reminder to pause and verify a claim before forwarding it — the moment before you hit "share" is the easiest place to stop misinformation from spreading.',
      },
    ],

    // ---------------------------------------------------------
    // ORANGE — Deepfake (Theme 3 "Digital Hoax" + Theme 4
    // "Detection Visualization" combined into one wheel colour)
    // ---------------------------------------------------------
    'deepfake': [
      // --- Theme 3: Deepfake and Digital Hoax ---
      {
        question: 'AI technology that is able to imitate the pitch, intonation, and timbre of a person\u2019s voice from just a short audio recording sample is called...',
        options: ['Voice typing', 'Video cloning', 'Photo editing', 'Screen recording'],
        correctIndex: 1,
        explanation: 'This technology recreates the unique characteristics of someone\u2019s voice from a short sample, which is why an AI-generated clip can sound eerily like a real person.',
      },
      {
        question: 'If a video call from an unknown number shows your relative\u2019s face but the lip-sync is stiff and broken, what should you be suspicious of?',
        options: [
          'A normal video call',
          'A slow internet connection',
          'The video likely uses Live Deepfake Filter technology',
          'Your phone camera is broken',
        ],
        correctIndex: 2,
        explanation: 'Real-time deepfake filters often struggle to perfectly sync lip movement with speech — stiff or mismatched lips are a classic tell that a face is being swapped live.',
      },
      {
        question: 'The most common form of Social Engineering fraud is exploiting the psychological aspects of the victim, which are...',
        options: [
          'Happiness, fun, and excitement',
          'Fear, panic, guilt, or haste.',
          'Sleepiness, boredom, and hunger',
          'Curiosity, friendship, and laughter',
        ],
        correctIndex: 1,
        explanation: 'Scammers deliberately create urgency and fear ("act now or something bad happens!") because panicked people skip careful thinking — that\u2019s exactly the reaction fraud relies on.',
      },
      {
        question: 'What confidential data should NOT be given to anyone, including individuals claiming to be from the Bank or Application Service?',
        options: ['Your favorite color', 'Your name', 'OTP (One-Time Password) code and PIN / Account Password.', 'Your favorite food'],
        correctIndex: 2,
        explanation: 'Legitimate banks and services never need your OTP, PIN, or password over a call or message — anyone asking for these is trying to steal access to your account.',
      },
      {
        question: 'The best step if you receive a voice call from an unknown number claiming to be a relative and asking for an emergency money transfer is...',
        options: [
          'Send the money immediately.',
          'Ask them to send more messages first.',
          'Turn off the call, then call your relative back directly to their official phone number saved in your contacts.',
          'Share your OTP to make sure they are your relative.',
        ],
        correctIndex: 2,
        explanation: 'Hang up and call the person back on the number you already have saved for them — this sidesteps voice cloning entirely, since you\u2019re reaching the real person through a channel the scammer doesn\u2019t control.',
      },
      // --- Theme 4: Deepfake and Detection Visualization of AI ---
      {
        question: 'Suddenly, a voice message appears on your phone that sounds exactly like your best friend, even though it was created by an AI computer! This voice-mimicking technology is called...',
        options: ['Voice Cloning', 'Voice Drawing', 'Voice Typing', 'Voice Recording'],
        correctIndex: 0,
        explanation: 'Voice cloning uses AI to recreate someone\u2019s exact vocal characteristics from sample audio, letting a computer "say" things that person never actually said.',
      },
      {
        question: 'When you watch an AI-generated fake video, pay attention to the lips. A characteristic of a Deepfake video is...',
        options: ['The person\u2019s clothes', 'His lip movements felt stiff and didn\u2019t match his voice.', 'The color of the video', 'The length of the video'],
        correctIndex: 1,
        explanation: 'Lip-sync is one of the hardest things for deepfake technology to get perfectly right, so stiff or mismatched mouth movement is a strong visual clue something\u2019s been faked.',
      },
      {
        question: 'If a strange number calls you with a voice that sounds like your sibling and asks you to send money/toys, what would you do?',
        options: [
          'Send the money right away.',
          'Give them your password first.',
          'Turn off the phone, then call your brother\u2019s real number to ask directly.',
          'Share the call with your friends and ask them to send the money.',
        ],
        correctIndex: 2,
        explanation: 'Just like with adults, the safest move for kids is the same: hang up, then call the person back on a number you already know is really theirs.',
      },
      {
        question: 'In an effort to ensure no one is fooled by Deepfake videos or sounds on the internet, our number one rule is...',
        options: [
          'Believe everything that looks real.',
          'Share the video with everyone.',
          'Don\u2019t be gullible and always tell/ask your parents or teachers.',
          'Trust a voice if it sounds like someone you know.',
        ],
        correctIndex: 2,
        explanation: 'Deepfakes are getting harder to spot with the naked eye, so the most reliable defense isn\u2019t a trick — it\u2019s staying skeptical and looping in a trusted adult when something feels off.',
      },
    ],

    // ---------------------------------------------------------
    // RED — Ice Breaking (Theme 5)
    // ---------------------------------------------------------
    'icbr': [
      {
        question: 'What does the term AI stand for?',
        options: ['Automatic Internet', 'Artificial Intelligence', 'Amazing Information', 'Advanced Internet'],
        correctIndex: 1,
        explanation: 'AI stands for Artificial Intelligence — computer systems designed to perform tasks that normally require human-like thinking, such as recognizing patterns or generating language.',
      },
      {
        question: 'The trail of activity history that we leave behind when surfing the internet (such as search history, comments, and uploaded content) is called...',
        options: ['Digital Footprint', 'Digital Password', 'Internet Game', 'Online Message'],
        correctIndex: 0,
        explanation: 'Every search, comment, and upload adds to your "digital footprint" — a lasting trail of activity that can be seen or traced long after you\u2019ve moved on.',
      },
      {
        question: 'If we compare it to a sports match, the Fact-Checking activity is more similar to the role of...',
        options: [
          'Player \u2013 plays the game',
          'Coach \u2013 trains the players',
          'Referee \u2013 ensures fair play and detects fouls/cheating',
          'Fan \u2013 watches and cheers for the players',
        ],
        correctIndex: 2,
        explanation: 'A fact-checker doesn\u2019t take sides in the story — like a referee, their job is to independently verify what happened and call out anything that breaks the rules of truth.',
      },
    ],
  };

  window.MIL.QUESTIONS = QUESTIONS;
})();
