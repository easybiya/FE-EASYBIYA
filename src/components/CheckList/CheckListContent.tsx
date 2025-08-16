import ChecklistAddButton from '@/components/Button/CheckListAddButton';
import CustomButton from '@/components/Button/CustomButton';
import { ChecklistPayloadItem, CheckType } from '@/types/checklist';
import CheckListContainer from './CheckListContainer';

interface Props {
  checklist: ChecklistPayloadItem[];
  setter: React.Dispatch<React.SetStateAction<ChecklistPayloadItem[]>>;
  onAddChecklist: (type: CheckType) => void;
  onSaveTemplate: () => void;
  isTemplate?: boolean;
}

const ChecklistContent = ({
  checklist,
  setter,
  onAddChecklist,
  onSaveTemplate,
  isTemplate,
}: Props) => {
  return (
    <div
      className={`flex-1 overflow-y-auto ${!isTemplate ? 'pb-104' : 'pb-208'} no-scrollbar pt-20`}
    >
      <CheckListContainer checklist={checklist} setter={setter} />
      {!isTemplate && (
        <>
          <div className="mt-24">
            <h2 className="text-lg font-bold text-gray-900 mb-12">체크리스트 추가</h2>
            <div className="grid grid-cols-3 gap-12">
              <ChecklistAddButton
                label="중복 선택"
                iconName="addListCheck"
                onClick={() => onAddChecklist('CHECKBOX')}
              />
              <ChecklistAddButton
                label="단일 선택"
                iconName="addListRadio"
                onClick={() => onAddChecklist('RADIO')}
              />
              <ChecklistAddButton
                label="텍스트"
                iconName="addListText"
                onClick={() => onAddChecklist('TEXT')}
              />
            </div>
          </div>
          <CustomButton
            label="템플릿 저장"
            variant="secondary"
            fullWidth
            className="mt-20 mb-24"
            onClick={onSaveTemplate}
          />
        </>
      )}
    </div>
  );
};

export default ChecklistContent;
