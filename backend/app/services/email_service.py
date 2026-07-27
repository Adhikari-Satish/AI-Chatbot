import smtplib
from email.mime.text import MIMEText
from email.message import EmailMessage
def send_email(
    receiver,
    otp
):
    sender = "worldgamersupporter@gmail.com"
    app_password = "wipa kvjz brem xtos"
    message = MIMEText(
        f"""
        Your AI Chatbot OTP is:
        {otp}
        Valid for 5 minutes.
        """
    )
    message["Subject"] = "AI Chatbot OTP Verification"
    message["From"] = sender
    message["To"] = receiver
    server = smtplib.SMTP(
        "smtp.gmail.com",
        587
    )
    server.starttls()
    server.login(
        sender,
        app_password
    )
    server.send_message(message)
    server.quit()