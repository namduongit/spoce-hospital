import { useState } from "react";
import TablePagination from "../others/pagination";

import type { MedicalPackageResponse } from "../../../responses/medical-package.response";
import EditMedicalPackage from "../edits/medical-package.edit";
import { formatPriceVND } from "../../../utils/formatNumber.util";
import MedicalPackageDetail from "../details/medical-package.detail";
import { changeMedicalPackageStatus } from "../../../services/medical-package.service";
import useCallApi from "../../../hooks/useCallApi";

type MedicalPackageTableProps = {
    medicalPackages: MedicalPackageResponse[];
    onSuccess?: () => void;
}

const MedicalPackageTable = (props: MedicalPackageTableProps) => {
    const { medicalPackages, onSuccess } = props;

    const { execute, notify } = useCallApi();

    const [page, setPage] = useState<number>(1);
    const [row, setRow] = useState<number>(5);

    const [showDetail, setShowDetail] = useState<boolean>(false);
    const [showEdit, setShowEdit] = useState<boolean>(false);
    const [medicalPackageSelect, setMedicalPackageSelect] = useState<MedicalPackageResponse>({} as MedicalPackageResponse);

    const handleShow = (medicalPackageSelect: MedicalPackageResponse) => {
        setMedicalPackageSelect(medicalPackageSelect);
        setShowDetail(true);
    }

    const handleEdit = (medicalPackageSelect: MedicalPackageResponse) => {
        setMedicalPackageSelect(medicalPackageSelect);
        setShowEdit(true);
    }

    const handleChangeStatus = async (medicalPackageSelect: MedicalPackageResponse, status: string) => {
        const restResponse = await execute(changeMedicalPackageStatus(medicalPackageSelect.id,  status ));
        notify(restResponse!, status === "INACTIVE" ? "Tạm dừng gói dịch vụ thành công" : "Kích hoạt gói dịch vụ thành công");
        if (restResponse?.result) {
            onSuccess?.();
        }
    }

    return (
        <>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-50">
                    <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700"># ID</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Tên gói khám</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Giá tiền</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Trạng thái</th>
                        <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Hành động</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {(medicalPackages && medicalPackages.length > 0) ? medicalPackages.slice((page - 1) * row, page * row).map((medicalPackage, idx) => (
                        <tr key={medicalPackage.id} className={`${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                            <td className="px-4 py-3 text-sm text-gray-700 font-medium"># {medicalPackage.id}</td>
                            <td className="px-4 py-3 text-sm text-gray-700 font-medium">{medicalPackage.name}</td>
                            <td className="px-4 py-3 text-sm text-gray-700 font-medium">{formatPriceVND(medicalPackage.price)}</td>
                            <td className="px-4 py-3 text-sm">
                                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium 
                                                                            ${medicalPackage.status === 'INACTIVE' ? 'bg-yellow-100 text-yellow-800' : ''}
                                                                            ${medicalPackage.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : ''}
                                                                        `}>
                                    {medicalPackage.status === 'INACTIVE' ? 'Dừng hoạt động' : 'Họat động'}
                                </span>
                            </td>

                            <td className="px-4 py-3 text-sm text-gray-600 text-center">
                                <div className="flex items-center justify-center gap-3">
                                    <button className="px-0.75 py-0.75 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                                        onClick={() => handleShow(medicalPackage)}
                                    >
                                        <i className="fa-solid fa-info"></i>
                                    </button>

                                    <button className="px-0.75 py-0.75 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                                        onClick={() => handleEdit(medicalPackage)}
                                    >
                                        <i className="fa-solid fa-wrench"></i>
                                    </button>                                    <button className="px-0.75 py-0.75 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                                        onClick={() => handleChangeStatus(medicalPackage, medicalPackage.status === "ACTIVE" ? "INACTIVE" : "ACTIVE")}
                                    >
                                        <i className={`fa-solid ${medicalPackage.status === "ACTIVE" ? "fa-lock" : "fa-lock-open"}`}></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                                <div className="flex flex-col items-center">
                                    <i className="fa-solid fa-box-open text-4xl mb-3 text-gray-300"></i>
                                    <p className="text-lg font-medium">Không có gói khám nào</p>
                                    <p className="text-sm mt-1">Chưa có dữ liệu để hiển thị</p>
                                </div>
                            </td>
                        </tr>)}
                </tbody>
            </table>
            <TablePagination array={props.medicalPackages} page={page} row={row} setPage={setPage} setRow={setRow} />
            {showDetail && (
                <MedicalPackageDetail
                    medicalPackageSelect={medicalPackageSelect}
                    setShowDetail={setShowDetail}
                />
            )}
            {showEdit && (
                <EditMedicalPackage
                    medicalPackageSelect={medicalPackageSelect}
                    setShowEdit={setShowEdit}
                    onSuccess={onSuccess}
                />
            )}
        </>
    )
}

export default MedicalPackageTable;