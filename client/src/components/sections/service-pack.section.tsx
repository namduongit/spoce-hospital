import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import useCallApi from '../../hooks/useCallApi';
import type { MedicalPackageModel } from '../../models/MedicalPackageModel.model';
import { formatPriceVND } from '../../utils/format-number.util';
import { getMedicalPackageList } from '../../services/public.service';

const ServicePackSection = () => {
    const { execute, loading } = useCallApi();
    const [medicalPackages, setMedicalPackages] = useState<MedicalPackageModel[]>([]);

    useEffect(() => {
        loadMedicalPackages();
    }, []);

    const loadMedicalPackages = async () => {
        const response = await execute(getMedicalPackageList());
        if (response.result) {
            const activePackages = response.data.filter((pkg: MedicalPackageModel) => pkg.status === 'ACTIVE');
            const mostExpensivePackages = activePackages
                .sort((a: MedicalPackageModel, b: MedicalPackageModel) => b.price - a.price)
                .slice(0, 4);
            setMedicalPackages(mostExpensivePackages);
        }
    };

    return (
        <div id="package-section" className="service-pack px-4 lg:px-20 pt-10 pb-10 bg-gray-50">
            <div className="service-pack__wrap">
                <motion.div 
                    className="font-bold text-2xl text-blue-600 text-left lg:text-center my-5"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    Các gói dịch vụ khám
                </motion.div>

                <motion.div 
                    className="service-pack__subtitle text-gray-600 text-center mb-8 max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    Các gói khám sức khỏe tổng quát với mức giá hợp lý, phù hợp với mọi đối tượng
                </motion.div>

                {loading ? (
                    <div className="flex justify-center items-center py-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    <motion.div 
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        {medicalPackages.map((pkg, index) => (
                            <motion.div 
                                key={pkg.id} 
                                className="bg-white rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden cursor-pointer"
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
                                            delay: index * 0.15,
                                            ease: "easeOut"
                                        }
                                    }
                                }}
                            >

                                <div className="p-6">
                                    <div className="mb-4">
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                                            {pkg.name}
                                        </h3>
                                        <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
                                            Hoạt động
                                        </span>
                                    </div>

                                    <p className="text-gray-600 mb-6 line-clamp-3 min-h-18">
                                        {pkg.description}
                                    </p>

                                    <div className="border-t border-gray-200 pt-4">
                                        <div className="flex items-center justify-between">
                                            <div className="text-left">
                                                <span className="text-2xl font-bold text-blue-600">
                                                    {formatPriceVND(pkg.price)}
                                                </span>
                                            </div>
                                            <button className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-300 font-medium">
                                                Đặt lịch khám
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {!loading && medicalPackages.length === 0 && (
                    <motion.div 
                        className="text-center py-8"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-gray-500">Hiện tại chưa có gói khám sức khỏe nào.</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default ServicePackSection;
