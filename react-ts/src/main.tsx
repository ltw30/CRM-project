import React, { useRef } from "react";
import { ColDef, ColGroupDef, ValueGetterParams } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./styles/main.module.css";
import { ReactComponent as UserImg } from "./img/person.svg";
import { ReactComponent as ChgId } from "./img/sync_alt.svg";
import { ReactComponent as LeftArrow } from "./img/double_arrow_left.svg";
import { ReactComponent as RightArrow } from "./img/double_arrow_right.svg";
import { ReactComponent as LiIcon } from "./img/featured_play_list.svg";
import { ReactComponent as HomeIcon } from "./img/home.svg";
import { ReactComponent as CallIcon } from "./img/call.svg";
import { ReactComponent as StarIcon } from "./img/star.svg";

const CustomButtonComponent = () => {
  return <button onClick={() => window.alert("clicked")}>Push Me!</button>;
};

const GridExample = () => {
  const [rowData, setRowData] = useState<any[]>([
    {
      name: "KNUCS",
      domain: "교육",
      dealCnt: 10,
      electric: null,
      desc: "대학교 컴퓨터공학과",
      manager: "장세현",
      curState: "진행 중",
    },
    {
      name: "QuotaLab",
      domain: "데이터 분석",
      dealCnt: 0,
      electric: null,
      desc: "데이터 분석 솔루션 제공",
      manager: "이영희",
      curState: "대기",
    },
    {
      name: "Attio",
      domain: "SaaS",
      dealCnt: 2,
      electric: null,
      desc: "플랫폼 관리 도구",
      manager: "박준호",
      curState: "완료",
    },
    {
      name: "Google",
      domain: "IT/클라우드",
      dealCnt: 4,
      electric: null,
      desc: "검색 엔진과 클라우드 제공",
      manager: "홍길동",
      curState: "진행 중",
    },
    {
      name: "Naver",
      domain: "포털 서비스",
      dealCnt: 1,
      electric: null,
      desc: "포털 서비스 제공",
      manager: "최민수",
      curState: "진행 중",
    },
    {
      name: "Kakao",
      domain: "모바일/IT",
      dealCnt: 2,
      electric: null,
      desc: "메신저와 다양한 IT 서비스",
      manager: "한지수",
      curState: "대기",
    },
  ]);
  const [columnDefs, setColumnDefs] = useState<
    (ColDef<any, any> | ColGroupDef<any>)[]
  >([
    {
      headerName: "이름(회사명)",
      valueGetter: (p: ValueGetterParams) => p.data.name,
      flex: 1,
    },
    { headerName: "분야", field: "domain", flex: 1 },
    { headerName: "설명", field: "desc", flex: 1.5 },
    { headerName: "담당자", field: "manager", flex: 1 },
    { headerName: "진행 상태", field: "curState", flex: 1 },
    {
      headerName: "딜 횟수",
      field: "dealCnt",
      valueFormatter: (p) => Math.floor(p.value).toLocaleString() + " 회",
      flex: 0.5,
    },
    { field: "속성 추가", cellRenderer: CustomButtonComponent, flex: 0.5 },
  ]);
  return (
    <div
      style={{ width: "100%", height: "350px" }}
      className={"ag-theme-quartz"}
    >
      <AgGridReact rowData={rowData} columnDefs={columnDefs} />
    </div>
  );
};

// 메인 화면 사이드바 메뉴
const Navigation = () => {
  return (
    <nav>
      <ul>
        <Link to="/main">
          <li>
            <HomeIcon />
            <h3>메인</h3>
          </li>
        </Link>
      </ul>
      <ul>
        <Link to="/menu1">
          <li>
            <LiIcon />
            <h3>MENU 1</h3>
          </li>
        </Link>
        <Link to="/menu2">
          <li>
            <LiIcon />
            <h3>MENU 2</h3>
          </li>
        </Link>
        <Link to="/menu3">
          <li>
            <LiIcon />
            <h3>MENU 3</h3>
          </li>
        </Link>
        <Link to="/menu4">
          <li>
            <LiIcon />
            <h3>MENU 4</h3>
          </li>
        </Link>
      </ul>
      <ul>
        <Link to="/contact">
          <li>
            <CallIcon />
            <h3>연락처</h3>
          </li>
        </Link>
        <Link to="/about">
          <li>
            <StarIcon />
            <h3>즐겨찾기</h3>
          </li>
        </Link>
      </ul>
    </nav>
  );
};

const Main: React.FC = () => {
  // 사이드바가 열려 있는지 여부를 관리하는 상태
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false); // 다크 모드 상태 관리

  // `ref`를 통해 DOM 요소 직접 접근
  const mainRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // 사이드바 토글 함수
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  // 다크 모드 함수
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode); // 상태를 반전시켜서 다크 모드 토글
  };

  // 사이드바 가시성에 따라 메인 콘텐츠의 여백을 조정
  useEffect(() => {
    if (mainRef.current && sidebarRef.current) {
      mainRef.current.style.width = isSidebarVisible
        ? "calc(100% - 260px)"
        : "calc(100% - 80px)";
      sidebarRef.current.style.width = isSidebarVisible ? "260px" : "80px";

      const anchors = sidebarRef.current.querySelectorAll("a");
      if (anchors) {
        anchors.forEach((a) => {
          (a as HTMLAnchorElement).style.width = isSidebarVisible
            ? "218px"
            : "100%";
        });
      }
      // 사이드바 안의 h2, h3 요소 가시성 제어
      const headings = sidebarRef.current.querySelectorAll("h2, h3");
      headings.forEach((heading) => {
        (heading as HTMLHeadingElement).style.display = isSidebarVisible
          ? "block"
          : "none";
      });
      const figure = sidebarRef.current.querySelector("figure");
      if (figure) {
        figure.style.flexDirection = isSidebarVisible ? "row" : "column";
        figure.querySelectorAll("button").forEach((button, idx) => {
          (button as HTMLButtonElement).style.order = isSidebarVisible
            ? `${idx + 1}`
            : `${2 - idx}`;
        });
      }
    }
  }, [isSidebarVisible]);

  // 리사이즈 이벤트 리스너를 추가하여 창 크기 변경에 대응
  useEffect(() => {
    const handleResize = () => {
      if (mainRef.current) {
        mainRef.current.style.width = isSidebarVisible
          ? "calc(100% - 260px)"
          : "calc(100% - 80px)";
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isSidebarVisible]);

  return (
    <div className={isDarkMode ? styles.darkMode : ""}>
      <div className={styles.body}>
        <aside
          ref={sidebarRef}
          className={styles.aside}
          style={{ width: isSidebarVisible ? "250px" : "1vh" }}
        >
          <figure>
            <button onClick={toggleDarkMode}>
              <ChgId className={styles.chgId} />
            </button>
            <button onClick={toggleSidebar}>
              {isSidebarVisible ? (
                <LeftArrow className={styles.leftArr} />
              ) : (
                <RightArrow className={styles.rightArr} />
              )}
            </button>
          </figure>
          <Link to="/profile">
            <div className={styles.profile_cont}>
              <UserImg className={styles.userImg} />
              <h2>김컴학</h2>
            </div>
          </Link>
          <Navigation />
        </aside>
        <div ref={mainRef} className={styles.rside}>
          <header className={styles.header}>
            <Link to="/">
              <h1>CRM SYSTEM</h1>
            </Link>
          </header>
          <main className={styles.main}>
            <GridExample />
          </main>
          <footer className={styles.footer}></footer>
        </div>
      </div>
    </div>
  );
};

export default Main;
