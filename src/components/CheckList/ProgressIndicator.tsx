import { useRouter } from 'next/router';
import IconComponent from '../Asset/Icon';

const stepMapping: { [key: number]: string } = {
  1: '/property/room-info',
  2: '/property/room-address',
  3: '/property/add-photo',
  4: '/property/checklist',
};

const reverseMapping: { [key: string]: number } = {
  '/property/room-info': 1,
  '/property/room-address': 2,
  '/property/add-photo': 3,
  '/property/checklist': 4,
};

export default function ProgressIndicator({ totalSteps }: { totalSteps: number }) {
  const router = useRouter();
  const currentStep = reverseMapping[router.pathname] || 1;

  const handleClickStep = (stepNumber: number) => {
    const path = stepMapping[stepNumber];
    if (path) {
      router.push(path);
    }
  };

  return (
    <div className="flex items-center justify-center py-1">
      {[...Array(totalSteps)].map((_, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;
        const isUpcoming = stepNumber > currentStep;

        return (
          <div
            key={stepNumber}
            className="flex items-center cursor-pointer"
            onClick={() => handleClickStep(stepNumber)}
          >
            <div
              className={`w-[18px] h-[18px] flex items-center justify-center rounded-full border border-gray-700
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

            {stepNumber !== totalSteps && <div className="w-12 h-[2px] bg-gray-700 mx-1"></div>}
          </div>
        );
      })}
    </div>
  );
}
