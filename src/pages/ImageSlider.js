import React from 'react';
import Carousel3d from "../dashboardUtils/Carousel3d";
import CarouselCard from "../dashboardUtils/CarouselCard";
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

const ImageSlider = () => {
    const [birthdays, setBirthdays] = useState([]);
    const dashboardDetails = useSelector((state) => state.dashboardData.data);

    useEffect(() => {
        if (dashboardDetails) {
            const dashboardBirthdays = dashboardDetails?.birthdays;
            setBirthdays(dashboardBirthdays);
        }
    }, [dashboardDetails]);

    return (
        <div
            className="App"
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                boxShadow: '10px 10px 80px rgba(0, 0, 0, 0.1)',
            }}
        >
            <div style={{ width: '100%', maxWidth: '60%', height: "23rem", }}>
                {birthdays?.length > 0 && (<Carousel3d
                    cards={birthdays?.map((item, index) => (
                        {
                            key: index,
                            content: <CarouselCard
                                age={item?.date_of_birth}
                                designation={item?.designation}
                                title={`${item?.first_name} ${item?.last_name}`}
                                src={item?.profile_pic}
                            />
                        }
                    ))}
                    offset={2}
                />)}
            
            </div>
        </div>
    );
};

export default ImageSlider;
