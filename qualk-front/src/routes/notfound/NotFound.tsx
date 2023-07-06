import React, {useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import styles from 'stylesheets/notfound/NotFound.module.css';
import {ReactComponent as NotFoundImg} from 'assets/images/notfound/notfound_image.svg';

function NotFound(){
    const location = useLocation();
    const navigate = useNavigate();
    
    const btnOnClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        navigate('/');
    }

    return (
        <div className={styles.not_found_root}>
            <div className={styles.not_found_container}>
                <div className={styles.image_container}>
                    <NotFoundImg />
                </div>
                <div className={styles.description_container}>
                    <span>페이지를 찾을 수 없어요 :(</span>
                    <p>찾으려는 페이지의 주소가 잘못 입력되었거나, 주소의 변경 혹은 삭제로 인해 이동할 수 없어요 :( <br/> 찾으려는 페이지의 주소를 다시 한 번 확인해 볼까요?</p>
                </div>
                <div className={styles.btn_container}>
                    <button onClick={btnOnClickHandler}>메인페이지로 이동하기</button>
                </div>
            </div>
        </div>
    )
}

export default NotFound;
