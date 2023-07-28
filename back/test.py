from app.route.v1.router_quiz import find_top


if __name__=="__main__":
    data = find_top('GAIQ', 'new',2)
    print(data)