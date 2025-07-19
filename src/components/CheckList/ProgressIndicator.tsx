import { useRouter } from 'next/router';
import IconComponent from '../Asset/Icon';

interface Props {
  isEdit: boolean;
  totalSteps: number;
}

export default function ProgressIndicator({ totalSteps, isEdit }: Props) {
  const router = useRouter();

  const reverseMapping: { [key: string]: number } = {
    '/property/room-info': 1,
    '/property/room-address': 2,
    '/property/add-photo': isEdit ? 0 : 3,
    '/property/checklist': isEdit ? 3 : 4,
  };

  const currentStep = reverseMapping[router.pathname] || 1;

  return (
    <div className="flex items-center justify-center py-4">
      {[...Array(totalSteps)].map((_, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;
        const isUpcoming = stepNumber > currentStep;

        return (
          <div key={stepNumber} className="flex items-center">
            <div
              className={`w-18 h-18 flex items-center justify-center rounded-full border border-gray-700
                ${isCurrent ? 'bg-gray-700 text-white text-b-13' : 'text-gray-700'}
                ${isUpcoming ? 'bg-white text-gray-700 border-gray-700' : ''}`}
            >
              {isCompleted ? (
                <IconComponent
                  name="checkCircle"
                  width={18}
                  height={18}
                  className="text-gray-700"
                />
              ) : (
                <span className="text-b-13">{stepNumber}</span>
              )}
            </div>

            {stepNumber !== totalSteps && <div className="w-48 h-2 bg-gray-700 mx-4"></div>}
          </div>
        );
      })}
    </div>
  );
}
