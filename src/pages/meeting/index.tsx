import { useState, useEffect, ReactNode } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import axios from 'axios';
import { getCookie } from 'cookies-next';

import { useLoginUser } from '../../features/authentication/hooks/useLoginUser';
import { urls } from '../../constants/urls';
import { StudentLayout } from '../../layouts/studentLayout/studentLayout';
import { AdminLayout } from '../../layouts/adminLayout/adminLayout';
import { Container, createStyles, Text } from '@mantine/core';
import { colors } from '../../constants/colors';
import { useAuthContext } from '../../features/authentication';

const useStyles = createStyles((theme) => ({
    row: {
        display: "flex"
    },
    
    column: {
        flex: 1,
        position: "relative"
    },

    meeting: {
        top: 59,
        left:0,
        right: 0,
        marginLeft: "auto",
        marginRight: "auto",
        width: 244
    }

}));


const ZoomMeeting: NextPage = () => {
    const [zak, setZak] = useState('');
    const { userMe, auth } = useAuthContext();

    const [loading, setLoading] = useState(true);

    const { classes } = useStyles();
    

    const getZAK = async () => {
        try {
            const { data } = await axios.get(`${urls.baseUrl}/zoom/access-token`);
            setZak(data.zak);
        } catch (error) {
            console.log(error)
        }
    }
    
  
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


    const startMeeting = async() => {
        if(userMe.role !== "student") getZAK();
        const ZoomMtgEmbedded = (await import('@zoomus/websdk/embedded')). default
        const client = ZoomMtgEmbedded.createClient();
        let meetingSDKElement = document.getElementById('meetingSDKElement') as HTMLElement;

        const signature = await getSignature();
      
        client.init({ 
            zoomAppRoot: meetingSDKElement, 
            language: 'en-US',
            customize: {
                meetingInfo: [
                    'topic',
                    'host',
                ],
                video: {
                    popper: {
                      disableDraggable: true
                    },
                    isResizable: true,
                    viewSizes: {
                        default: {
                            width: 1000,
                            height: 600
                        },
                        ribbon: {
                        width: 300,
                        height: 700
                        }
                    }
                  },
              } 
        
        });

        client.join({
            sdkKey: '2KD9UYPENeYPXWPWX7JSNJm3803E7u6IGRAY',
            signature: signature,
            meetingNumber: '3196494041',
            password: 'udg1Fu',
            userName: `${userMe.firstName} ${userMe.lastName}`,
            zak: userMe.role === "student" ? undefined : zak 
        });

    }

    const ParentTag = ({children}: any) => {

      if (userMe.role === "admin"){
        return (
            <AdminLayout>
                {children}
            </AdminLayout>
        )
       }

       return (
        <StudentLayout>
            {children} 
        </StudentLayout>
    )

    }
    

    useEffect(() => {
        startMeeting();
        
        console.log(userMe)
    }, [loading]);


    return (
        <>
            <Head>
                <title>Luddoc Skills For Life</title>
                <meta name="description" content="Luddoc Skills For Life" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            
            <ParentTag>
                <Container>
                    <div className={classes.row}>
                        <div className={classes.column}>
                            <Text color={`${colors.secondaryColor}`} weight={600} size={28}>Luddoc Live Session</Text>
                            <div id="meetingSDKElement"></div>
                        </div>
                    </div>
                </Container>
           
            </ParentTag>

           
        </>
       
    )
}

export default ZoomMeeting;