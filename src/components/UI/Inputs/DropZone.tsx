import React, { Component } from 'react'
import { Col, FormText, Label, FormGroup} from 'reactstrap';
import Dropzone from 'react-dropzone'

interface Props extends React.Props<DropZoneFile>{
    onChangeField: (data) => void;
    label: string;
    input: any;
    meta: any;
}

export default class DropZoneFile extends Component<Props> {
    render() {
        const {input, meta, label, onChangeField} = this.props;
        let text = 'Drag & drop some files here, or click to select files';
        return (
            <Col>
                <FormGroup>
                    <Label className="mr-5" for={input.name}>{label}</Label>
                    <Dropzone onDrop={acceptedFiles => {
                        input.onChangeField(acceptedFiles[0])
                        text = acceptedFiles[0].name;
                    }}>
                        {({ getRootProps, getInputProps, isDragActive }) => (
                            <section>
                                <div style={{ borderColor: 'gray', border: 'solid 1px', borderRadius: '10px', height: '100px' }} {...getRootProps()}>
                                    <input
                                        {...getInputProps()}
                                        onChange={
                                            (e) => {
                                                e.preventDefault();
                                                const files = e.target.files[0];
                                                if(onChangeField != undefined){
                                                    onChangeField({ value: files.name, name: input.name });
                                                }
                                                input.onChange(files);
                                            }
                                        } />
                                    {
                                        isDragActive ?
                                            <p className='text-center mt-5'>Drop the files here ...</p> :
                                            <p className='text-center mt-5'>{input.value === undefined ? text : input.value.name}</p>
                                    }
                                </div>
                            </section>
                        )}
                    </Dropzone>
                    {meta.touched && meta.error &&
                        <FormText color="danger" style={{ fontSize: '13px' }}>
                            {meta.error}
                        </FormText>
                    }
                </FormGroup>
            </Col>
        )
    }
}
