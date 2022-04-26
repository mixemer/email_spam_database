export const router_names = {
    home: "",
    report: "report",
    FAQs: "faqs",
    email: "email"
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