type NurseSection = {
  id: number,
  image: string,
  name: string,
  position: string,
  detail: string,
}

const NurseSection = (props: NurseSection) => {
  const { image, name, position, detail } = props;

  return (
    <div className="block nurse-section bg-white rounded-2xl shadow-2xl px-4 py-4 flex-col">
      <div className="nurse-section__wrap flex flex-col flex-grow">
        <div className="nurse-section__image overflow-hidden mb-2">
          <img src={image} alt="" className="w-full h-[300px] object-cover object-top rounded-xl" />
        </div>
        <div className="nurse-section__description flex flex-col flex-grow">
          <div className="nurse-section__name font-bold text-lg mb-1">{name}</div>
          <div className="nurse-section__position text-blue-600 mb-1">{position}</div>
          <div className="nurse-section__detail text-sm text-gray-600">{detail}</div>
        </div>
      </div>
    </div>
  );
}

export default NurseSection;