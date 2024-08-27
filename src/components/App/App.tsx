import { createContext } from "react";

// Styles
import "../../styles/reset.scss";
import "../../styles/utilities.scss";
import "../../styles/global.scss";
import css from "./App.module.scss";

//Medias (Images, audio, etc.)
import acan_logo from "../../images/acan_logo.svg";
//@ts-ignore
import { stepControllersProps } from "../../data";

//Components
import Indicator from "../Indicator/Indicator";
import StepControllers from "../StepControllers/StepControllers";
import UniqueSteps from "../UniqueSteps/UniqueSteps";

//Hooks
import { useCurrentStep } from "./useCurrentStep";
import { useFormData } from "./useFormData";
import { useMobile } from "../../hooks/useMobile";

//Types
import { HandleStepChangeType } from "../../types";

// Context
export const StepChangeContext = createContext<HandleStepChangeType | null>(null);

function App() {
  const { currentStep, isCurrentStep, handleStepChange } = useCurrentStep();
  const { isMobile } = useMobile();
  const {
    register,
    handleSubmit,
    errors,
    firstStepFormData,
    billingPlan,
    vehicleType,
    regularityObj,
    handleMultipleInputs,
    handleSetBillingPlan,
    handleRegularity,
    regularity,
    handleAddOns,
    addOns,
  } = useFormData();

  const WrapperTag = currentStep < 5 ? "form" : "div";
  const bottomMobileNav = isMobile && !isCurrentStep(5);

  return (
    <StepChangeContext.Provider value={handleStepChange}>
      <header className={css.header}>
        <div id="logo" className={css.headerContainer}>
          <img src={acan_logo} alt="Logo" className={css.headerImage} />
        </div>
        <div id="landing-text" className={css.titles}>
          <h1>Obtenez le meilleur taux pour votre prêt auto</h1>
          <h3 className={css.subtitle}>Aucune obligation, soumission gratuite</h3>
        </div>

      </header>
      <main className={css.app}>
        <Indicator currentStep={currentStep} />
        <WrapperTag
          className={css.stepsWrapper}
          onSubmit={handleSubmit(() => handleStepChange(1))}
          aria-live="polite"
        >
          <UniqueSteps
            currentStep={currentStep}
            register={register}
            errors={errors}
            firstStepFormData={firstStepFormData}
            billingPlan={billingPlan}
            vehicleType={vehicleType}
            regularityObj={regularityObj}
            handleMultipleInputs={handleMultipleInputs}
            handleSetBillingPlan={handleSetBillingPlan}
            handleRegularity={handleRegularity}
            regularity={regularity}
            handleAddOns={handleAddOns}
            addOns={addOns}
            isMobile={isMobile}
          />
          {bottomMobileNav && (
            <div className={css.controllersMobileWrapper}>
              <StepControllers {...stepControllersProps[(currentStep)]} />
            </div>
          )}
        </WrapperTag>
      </main>
    </StepChangeContext.Provider>
  );
}

export default App;
