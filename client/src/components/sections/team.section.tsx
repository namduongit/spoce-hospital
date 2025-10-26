import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import NurseSection from './nurse.section';
import { getDoctorList } from '../../services/doctor.service';
import useCallApi from '../../hooks/useCallApi';
import type { DoctorResponse } from '../../responses/doctor.response';

const TeamSection = () => {
    const { execute } = useCallApi();
    const [doctors, setDoctors] = useState<DoctorResponse[]>([]);

    useEffect(() => {
        loadDoctors();
    }, []);

    const loadDoctors = async () => {
        const response = await execute(getDoctorList());
        if (response?.result) {
            const data: DoctorResponse[] = response.data;
            setDoctors(data);
        }
    };

    return (
        <div id="doctor-section" className="nurse-team px-4 lg:px-20 pt-5 pb-10">
            <div className="nurse-team__wrap">
                <motion.div 
                    className="font-bold text-2xl text-blue-600 text-left lg:text-center my-5"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    Đội ngũ bác sĩ kinh nghiệm
                </motion.div>
                
                <motion.div 
                    className="grid grid-cols-2 lg:grid-cols-4 gap-4"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {doctors.map((doctor, idx) => (
                        <motion.div
                            key={idx}
                            variants={{
                                hidden: { 
                                    opacity: 0, 
                                    y: 60,
                                    scale: 0.8
                                },
                                visible: { 
                                    opacity: 1, 
                                    y: 0,
                                    scale: 1,
                                    transition: {
                                        duration: 0.6,
                                        delay: idx * 0.15,
                                        ease: "easeOut"
                                    }
                                }
                            }}
                        >
                            <NurseSection {...doctor} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}

export default TeamSection;