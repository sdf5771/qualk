import hashlib

def hash_password(password):
    sha256 = hashlib.sha256()
    sha256.update(password.encode())
    return sha256.hexdigest()

# 예제 사용
plain_password = "병익이는 귀엽다 true"
hashed_password = hash_password(plain_password)

print(f"Plain Password: {plain_password}")
print(f"Hashed Password: {hashed_password}")
