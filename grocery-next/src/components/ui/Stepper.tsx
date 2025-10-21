'use client';

import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Check } from 'lucide-react';

interface Step {
  id: string;
  title: string;
  description?: string;
}

interface StepperProps {
  /**
   * The steps to display
   */
  steps: Step[];
  /**
   * The current active step index
   */
  currentStep: number;
  /**
   * Additional CSS classes to apply
   */
  className?: string;
}

/**
 * A stepper component to show progress through a multi-step process
 * 
 * @example
 * ```tsx
 * <Stepper 
 *   steps={[
 *     { id: "1", title: "Account" },
 *     { id: "2", title: "Shipping" },
 *     { id: "3", title: "Payment" }
 *   ]}
 *   currentStep={1}
 * />
 * ```
 */
export function Stepper({ steps, currentStep, className }: StepperProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          
          return (
            <div key={step.id} className="flex flex-col items-center flex-1">
              <div className="flex items-center">
                <motion.div
                  initial={false}
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    backgroundColor: isCompleted || isActive ? "#16a34a" : "#e5e7eb"
                  }}
                  className={cn(
                    "flex items-center justify-center rounded-full",
                    "h-10 w-10 border-2",
                    isCompleted ? "border-green-500 bg-green-500" : 
                    isActive ? "border-primary-500" : "border-gray-300"
                  )}
                >
                  {isCompleted ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Check className="h-5 w-5 text-white" />
                    </motion.div>
                  ) : (
                    <span className={cn(
                      "text-sm font-medium",
                      isCompleted ? "text-white" : 
                      isActive ? "text-primary-600" : "text-gray-500"
                    )}>
                      {index + 1}
                    </span>
                  )}
                </motion.div>
                
                {index < steps.length - 1 && (
                  <motion.div
                    initial={false}
                    animate={{
                      backgroundColor: index < currentStep ? "#16a34a" : "#e5e7eb"
                    }}
                    className="h-1 w-full flex-1"
                  />
                )}
              </div>
              
              <div className="mt-2 text-center">
                <motion.p 
                  className={cn(
                    "text-sm font-medium",
                    isActive ? "text-primary-600" : "text-gray-600"
                  )}
                  animate={{ opacity: isActive ? 1 : 0.7 }}
                >
                  {step.title}
                </motion.p>
                {step.description && (
                  <p className="text-xs text-gray-500 mt-1">
                    {step.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}