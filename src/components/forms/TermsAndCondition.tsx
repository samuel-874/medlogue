import { ChangeEvent, useState } from "react";
import FStyles from "./Forms.styles";
import { useTheme } from "styled-components";
import { Input } from "./Input";
import { Google } from "../general/Icons";
import {  FieldDatas, FormEvents, FormData } from "../../types/types";
import { Link, useParams } from "react-router-dom";

type TermsProps = {
    checked: boolean,
    toggleFunc: Function,
    error: string
}

function TermAndCondition(props: TermsProps) {
    return (
        <FStyles.Checkbox>
            <div>
            <input 
                type="checkbox" 
                checked={props.checked} 
                onChange={e => props.toggleFunc(e)}
            />
            <p>I agree to the <a href="/terms-of-service#terms" target="_blank">terms</a> & <a  href="/terms-of-service#terms" target="_blank">conditions</a></p>
            </div>
            { props.error && <data>{props.error}</data>}
        </FStyles.Checkbox>
    )
}

export default TermAndCondition;