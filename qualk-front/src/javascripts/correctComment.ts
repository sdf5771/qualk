const correctComment = (correctPercent: number, passPercent: number, isPass: boolean) => {
    switch (isPass){
        case true:
            if(passPercent === correctPercent){
                return "완벽한 정답율이네요! 이제 실전으로 가서 합격하실 일만 남았어요!"
            } else if ((passPercent + 10) >= correctPercent){
                return "짝짝짝! 안정적인 정답율이에요! \n 하지만 진정한 고수는 자신의 실수를 용납하지 않죠! \n 틀린 문제에 대한 정답을 확인해보세요!"
            } else if ((passPercent + 10) < correctPercent){
                return "지금과 같은 정답율이라면 합격은 따놓은 당상이에요! \n 혹시 모를 상황을 대비해서 꼼꼼하게 오답을 보완하여 완벽한 준비를 해보세요!"
            }
            return ""
            break

        case false:
            if((passPercent - 10) >= correctPercent){
                return "합격이 코앞인데 너무나도 아쉬워요! \n Qualk과 함께 오답을 확실하게 짚고 넘어가서 원하는 합격율에 도달해보자구요!"
            } else if ((passPercent - 10) < correctPercent){
                return "혹시 결과에 좌절하고 있나요? 괜찮아요! \n Qualk과 함께라면 다음번 결과때는 분명 좋은 결과가 있을 거에요! \n 울지 말고, 오답을 차근차근 확인해볼까요?"
            }

            return ""
            break
    }
}

export default correctComment;