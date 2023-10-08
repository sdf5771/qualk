import random

def random_number():
    random_list = []
    for i in range(0,4):
        temp_int = random.randint(0,9)
        random_list.append(temp_int)
    return random_list

if __name__=="__main__":
    export_number = random_number()
    print(export_number)
    