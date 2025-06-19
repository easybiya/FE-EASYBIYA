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
    <div className="flex-1 overflow-y-auto px-4 pb-48 no-scrollbar">
      <CheckListContainer checklist={checklist} setter={setter} />
      {!isTemplate && (
        <>
          <div className="mt-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3">체크리스트 추가</h2>
            <div className="grid grid-cols-3 gap-3">
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
            className="mt-5 mb-6"
            onClick={onSaveTemplate}
          />
        </>
      )}
    </div>
  );
};

export default ChecklistContent;
