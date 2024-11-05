import React, { createContext, useMemo, useState } from "react";
import NavigationBar from "./Navbar";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Toaster from "./Toaster";
import { useNavigate } from "react-router-dom";

export const Context = createContext("unknown");

function Layout(props) {
    const navigate = useNavigate();
    const [toaster, setToaster] = useState({
        title: "",
        show: false,
        message: "",
        type: "",
    });

    const { hasNavigationBack } = props;

    const value = useMemo(() => ({ toaster, setToaster }), [toaster]);
    return(
        <Context.Provider value={value}>
            <div>
                <NavigationBar />
                {hasNavigationBack && (
                    <ArrowLeftOutlined 
                        style={{
                            color: "#0D6EFD",
                            fontSize: "24px",
                            marginLeft: "5%",
                            marginTop: "1%",
                        }}
                        onClick={() => navigate(-1)}
                    />
                )}
                <div className="container m-5">{props.children}</div>
            </div>
            <Toaster 
                title={toaster.title}
                message={toaster.message}
                type={toaster.type}
                showToast={toaster.show}
                onClose={() => setToaster({...toaster, show: false})}
            />
        </Context.Provider>
    );
}

export default Layout;
