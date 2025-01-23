import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import * as React from "react";
import { useColorScheme } from "~/lib/useColorScheme";

const Sheet = React.forwardRef<
  BottomSheetModal,
  React.ComponentPropsWithoutRef<typeof BottomSheetModal>
>(
  (
    { index = 0, backgroundStyle, style, handleIndicatorStyle, ...props },
    ref,
  ) => {
    const { isDarkColorScheme } = useColorScheme();

    const renderBackdrop = React.useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />
      ),
      [],
    );

    return (
      <BottomSheetModal
        ref={ref}
        index={index}
        backgroundStyle={{
          backgroundColor: isDarkColorScheme ? "#1C1C1E" : "#FFFFFF",
        }}
        style={{
          borderWidth: 1,
          borderColor: isDarkColorScheme ? "#38383A" : "#E5E5EA",
          borderTopStartRadius: 16,
          borderTopEndRadius: 16,
        }}
        handleIndicatorStyle={{
          backgroundColor: isDarkColorScheme ? "#38383A" : "#E5E5EA",
        }}
        backdropComponent={renderBackdrop}
        {...props}
      />
    );
  },
);

Sheet.displayName = "Sheet";

function useSheetRef() {
  return React.useRef<BottomSheetModal>(null);
}

export { Sheet, useSheetRef };
