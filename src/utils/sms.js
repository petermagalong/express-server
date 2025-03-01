
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_ACCOUNT_AUTH;
const twilioNumber = process.env.TWILIO_ACCOUNT_MOBILE;
const verifiedMobile = process.env.TWILIO_ACCOUNT_MOBILENUMBER;
const client = require("twilio")(accountSid, authToken);

exports.sendSMS = async (body) => {
    try {
        const message = await client.messages.create({
            body,
            to: verifiedMobile,
            from: twilioNumber,
        });
        console.log(message);
    } catch (error) {
        // You can implement your fallback code here
        console.error(error);
    }
};