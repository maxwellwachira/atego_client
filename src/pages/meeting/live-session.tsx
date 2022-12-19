import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import axios from "axios";
import { useRouter } from "next/router";

import { useAuthContext } from "../../features/authentication";
import { urls } from "../../constants/urls";


const ClientMeeting: NextPage = () => {
    const [zak, setZak] = useState('');
    const { userMe, auth } = useAuthContext();
    const router = useRouter();

    const getSignature = async () => {
        const postSignatureData = {
            meetingNumber: '3196494041',
            role: userMe.role === "student" ? 0 : 1
        }
        try {
            const { data } = await axios.post(`${urls.baseUrl}/zoom/signature`, postSignatureData);
            return data.signature;
        } catch (error) {
            console.log(error)
        }
    }
    const getZAK = async () => {
        try {
            const { data } = await axios.get(`${urls.baseUrl}/zoom/access-token`);
            setZak(data.zak);
        } catch (error) {
            console.log(error)
        }
    }
    
    const startMeeting = async() => {
        const ZoomMtg = (await import('@zoomus/websdk')).ZoomMtg
        //configurations
        ZoomMtg.preLoadWasm();
        ZoomMtg.prepareWebSDK();
        // loads language files, also passes any error messages to the ui
        ZoomMtg.i18n.load('en-US');
        ZoomMtg.i18n.reload('en-US');

        ZoomMtg.setZoomJSLib('https://source.zoom.us/2.9.5/lib', '/av');
       
        if(userMe.role !== "student") getZAK();
        document.getElementById('zmmtg-root')!.style.display = 'block';

        const signature = await getSignature();

        ZoomMtg.init({
            leaveUrl: '/meeting/leaveUrl',
            meetingInfo: [
                'topic',
                'host',
            ],
            success: (success: any) => {
            console.log(success);
    
            ZoomMtg.join({
                userEmail: `${userMe.email}`,
                sdkKey: '2KD9UYPENeYPXWPWX7JSNJm3803E7u6IGRAY',
                signature: signature,
                meetingNumber: '3196494041',
                passWord: 'udg1Fu',
                userName: `${userMe.firstName} ${userMe.lastName}`,
                zak: userMe.role === "student" ? undefined : zak, 
                success: (success: any) => {
                    console.log(success)
                },
                error: (error: any) => {
                    console.log(error)
                }
            })
    
            },
            error: (error: any) => {
                console.log(error)
            }
        })
    }

    useEffect(() => {
        if(auth){
            startMeeting();
        }else {
            router.push('/auth/sign-in');
        }
    }, []);
    if(!auth) return <></>;
    return (
        <div>
            <h1>Atego Live Session meeting loading ...</h1>
        </div>
    ) 

}

export default ClientMeeting;