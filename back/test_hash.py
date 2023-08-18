import bcrypt

def get_password_hash(password: str) -> str:
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')

if __name__=="__main__":
    pass_word = 'test12356'
    print(pass_word)
    hash_pass = get_password_hash(pass_word)
    print(hash_pass)