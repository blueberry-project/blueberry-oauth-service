import smtplib
from email.mime.text import MIMEText
import logging 


class EmailSMTP: 
    def __init__(self) -> None:    
        self._sender_email : str = "blueberryproject.pi@gmail.com"
        self.receiver_email : str = "gustavo.antonio@sptech.school, rafael.raposo@sptech.school, matheus.gomes@sptech.school, davi.guilherme@sptech.school"
        self.subject : str = ""
        self._password = "geos nwng sqco ygya"  
        self.text=""

    def send_email(self) : 
        message = MIMEText(self.text, "html", "utf-8")
        message["From"] = self._sender_email
        message["To"] = self.receiver_email 
        message["Subject"] = self.subject
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(self._sender_email, self._password)
            server.sendmail(self._sender_email, self.receiver_email, message.as_string())
    

    def set_receiver(self, receiver : str ) : 
        self.receiver_email =  receiver ; 
    
    def set_subject(self, subject ): 
        self.subject =  subject
        
    def set_message(self, message ) : 
        self.text = message
    
    def get_message(self): 
        return self.text
    


if __name__ == "__main__" :
    email = EmailSMTP()
    email.set_subject("Teste Blueberry")
    email.set_message("Envio de email blueberry")
    email.send_email()
    
