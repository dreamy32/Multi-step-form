import React from "react";
import css from "./BaseRadioImage.module.scss";
import { BaseRadioImageProps } from "../../types";

function BaseRadioImage({
    name,
    radios,
    checked,
    customStyle,
    handleRadioClick,
}: BaseRadioImageProps) {
    const radioStyle = customStyle === "toggle" ? "toggle" : "radio";

    return (
        <div className={css[`${radioStyle + "Group"}`]}>
            <fieldset className={css[`${radioStyle + "Fieldset"}`]}>
                {/* <legend className={css[`${radioStyle + "Legend"}`]}>{legend}</legend> */}
                {radios.map((radio, i) => {
                    const value = i;
                    return (
                        <React.Fragment key={radio.id}>
                            <input
                                className={css[`${radioStyle + "Input"}`]}
                                type="radio"
                                name={name}
                                id={radio.id}
                                value={value}
                                checked={checked === value}
                                onChange={() => {
                                    handleRadioClick(value);
                                }}
                            />
                            <label
                                className={
                                    checked === value
                                        ? css[`${radioStyle + "RadioSelected"}`]
                                        : css[`${radioStyle + "Radio"}`]
                                }
                                htmlFor={radio.id}
                            >
                                {radio.svgIcon && (
                                    <span className={css[`${radioStyle + "Icon"}`]}>
                                        <span dangerouslySetInnerHTML={{ __html: radio.svgIcon }} />
                                    </span>
                                )}
                                <span className={css[`${radioStyle + "TextArea"}`]}>
                                    <p className={css[`${radioStyle + "Label"}`]}>
                                        {radio.label}
                                    </p>
                                </span>
                            </label>
                        </React.Fragment>
                    );
                })}
            </fieldset>
        </div>
    );
}

export default BaseRadioImage;
