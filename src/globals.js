export const router_names = {
    home: "",
    report: "/report",
    FAQs: "/faqs",
    email: "/email"
}

export const Anonymous = "Anonymous"

/*
Seached on these websites.
https://www.atg.wa.gov/5-common-e-mail-scams
https://www.securitymetrics.com/blog/top-10-types-phishing-emails
https://www.consumerfinance.gov/ask-cfpb/what-are-some-common-types-of-scams-en-2092/
*/

export const scam_types = [
    {
        scam_name:  "Urgent Offer", 
        detail: "Email faking an offer trying to get your info.Example: 'Look at this offer for refinancing!'"
    },
    {
        scam_name:  "Lottery", 
        detail: "Foreign lottery scams are rampant. If you did not enter a lottery, you did not win a lottery. If you did enter the lottery, you still are very unlikely to win, and you would not be notified via e-mail. This is a straightforward scam to get your information."
    },
    {
        scam_name:  "Survey", 
        detail: "These scams rely on people’s desire to weigh in on issues and be heard on the issues of the day. In an election year one flavor is the voting survey, but any hot topic will do: global warming, attitudes towards war, the handling of the latest natural disaster, and so on."
    },
    {
        scam_name:  "Fake Billing", 
        detail: "Email containing a fake bill trying to steal your information and money"
    },
    {
        scam_name:  "Debt Settlement/Relief", 
        detail: "Email promising to settle your debt, only to steal from you."
    },
    {
        scam_name:  "Government", 
        detail: "Someone posing as the government trying to steal your info."
    },
    {
        scam_name:  "PayPal", 
        detail: "Email trying to steal your PayPal information or take money from you using PayPal."
    },
    {
        scam_name:  "Tax", 
        detail: "Email promising money from a fake tax return."
    },
    {
        scam_name:  "Property", 
        detail: "Someone trying to steal your property."
    },
    {
        scam_name:  "Charity", 
        detail: "Thief posing as a real charity or makes up a charity name trying to get money from you."
    },
    {
        scam_name:  "Money Transfer", 
        detail: "Email containing a fake digital money transfer."
    },
    {
        scam_name:  "Expiration Date", 
        detail: "Email saying that something needs to be done before an expiration date."
    },
    {
        scam_name:  "Imposter", 
        detail: "Person claiming to be your friend or relative trying to take your assets."
    },
    {
        scam_name:  "Grandparent Scam", 
        detail: "Person sounding like a relative trying to get money from you."
    },
    {
        scam_name:  "Romance", 
        detail: "Someone faking to be your partner trying to get your assets."
    },
    {
        scam_name:  "Friendly Bank", 
        detail: "Email posing as a legitimate bank trying to steal your info."
    },
    {
        scam_name:  "The 'Official Notice'", 
        detail: "These scams attempt to fool consumers into believing they’ve received an e-mail that requires them to take some action. Often purporting to be from government agencies, these e-mails notify you of a problem. This example was sent in May, a time when people are more likely to believe an announcement is from the IRS.  Here you’re supposed to be relieved that the IRS is acknowledging they received your payment, and then be anxious that there is a problem, and click without thinking."
    },
    {
        scam_name:  "Compromised Account", 
        detail: "Email saying that one of your accounts are vulnerable or compromised."
    },
    {
        scam_name:  "Hidden Url", 
        detail: "Email with a fake or hidden link trying to get your information."
    },
    {
        scam_name:  "Fake Virus", 
        detail: "Email telling you that your computer has a virus when it may not."
    },
    {
        scam_name:  "Other", 
        detail: ""
    },
]

export var sounds = {
    info: "https://res.cloudinary.com/dxfq3iotg/video/upload/v1557233294/info.mp3",
    // path to sound for successfull message:
    success: "https://res.cloudinary.com/dxfq3iotg/video/upload/v1557233524/success.mp3",
    // path to sound for warn message:
    warning: "https://res.cloudinary.com/dxfq3iotg/video/upload/v1557233563/warning.mp3",
    // path to sound for error message:
    error: "https://res.cloudinary.com/dxfq3iotg/video/upload/v1557233574/error.mp3",
};

export const FAQ = [
    {
        question: "What is a scam email?",
        answer: "A scam email is a deceiving email that tries to steal your information. There are different types of email scams:",
        answer1: "  -Phishing: when attackers send malicious emails designed to trick people into falling for a scam.", 
        answer2: "  -Credential theft: occurs when an unauthorized person (attacker) obtains and uses valid account credentials (username and password) for unauthorized access to a computer.",
        answer3: "  -Malware: an umbrella term for various types of malicious programs that are delivered and installed on end-user systems and servers.",
        answer4: "  -Monetary theft: when attackers still your debit or credit car infomation and are able to use it to drain money from your bank account.",
        answer5: "  -Wire fraud: a type of fraud that involves the use of some form of telecommunications or the internet. These can include a phone call, a fax, an email, a text, or social media messaging, among many other forms.",
        answer6: "  -Supply-chain attacks: Historically the term “supply chain” implied one company providing a good or service to another company who, in turn, provided a value-added good or service to another company and so on until a fully realized product is purchased by the final customer.",
    },
    {
        question: "What is a phishing email and how is it related to scam emails?",
        answer: "A phishing email is a type of scam sent by another person disguising as a legitimate, trustworthy source.",
        answer1: "Phishing is an example of social engineering: a collection of techniques that scam artists use to manipulate human psychology. Social engineering techniques include forgery, misdirection and lying—all of which can play a part in phishing attacks. On a basic level, phishing emails use social engineering to encourage users to act without thinking things through.",
    },
    {
        question: "How do I search for a scam email?",
        answer: "Start typing in the search bar on the home page. It will trim the table and will find your email. If it does not exist, you can report the email (See the next 2 questions).",
    },
    {
        question: "How do I add a report to an existing entry in the table?",
        answer: "Click “Report” at the top right of the page. Insert your name, email, the scam email, and the scam type, then press the “Send” button. The number of reports represent the amount of times people has spoted that scam email. If you find the suspicious email in the list, please report it. That will help other users by letting them know how common is that scam email.",
    },
    {
        question: "The email I searched for does not exist in the table or the scam type is different. How do I add it?",
        answer: "You can contribute to the list of scam emails! First you click on “Report” at the top right of the page. The Scam Email Ticket page will appear. PLease, fill out the form by inserting your name, email, the scam email, and the scam type. You can leave your name and email boxes in “anonymous”, but we encourage users to provide real information, your email will not be display. After filling out the form press the “Send” button. This will create a new table entry with 1 report and 0 comments.",
    },
    {
        question: "Where do I access the comments for a scam email?",
        answer: "First, click on the email that you searched up inside the table on the \"Home\" page. This should bring you to the comments page.",
    },
    {
        question: "How do I add a comment?",
        answer: "Inside the comments page of a particular email, you can add a comment by putting your email, username and your comments. Finally, press the button that says \"Add a comment\".",
    },
    {
        question: "What do I do if I click on a link in a scam email?",
        answer: "If you click any link inside a scam email do not give any personal information like full name, phone number, SSN, credit or debit card numbers, or any other type of sensitive information. If a new tab was opened, close it immediately.",
    },
    {
        question: "How can I identify a scam email?",
        answer: "There are different clues that you can use to identify a scam email. First of all, most of the time scam emails will addressed to you using generic words like \"customer\", \"student\", or \"account owner\". Second, sometimes those emails comes from a addresses that might look similar to a legitimate one, but wiht slightly differences. For example, addresses ending at \"@bcmail.cuny.com\" instead of \"@bcmail.cuny.edu\".",
        answer1: "Another way to spot a scam email is by noticing that most of them want you to \"act quickly\", because supposedly something is going to happend of you do not act soon. For example, they can say that you need to change the password of your account, or that you have re-submit personal information like SSN. NEVER PROVIDE THAT INFORMATION TO A SUSPICIOUS EMAIL."
    },
    {
        question: "What do I do if I already provided some information to a scam email?",
        answer: "If the information you provided includes passwords and accounts related to them, you should immediately go to those accounts and change their passwords. It is a good practice to set \"Two Step Verification\" process for your accounts. If you shared your SSN you should contact the Social Secuirty Administration and let them know about this issue. If you shared your phone number be aware of upcoming scams through text messages and/or phone calls.",
    }
]