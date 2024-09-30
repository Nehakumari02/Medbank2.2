import { useDropzone } from 'react-dropzone';

const UploadRequestSheet = () => {
    const onDrop = (acceptedFiles) => {
        console.log(acceptedFiles);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div className="border-2 border-dashed border-blue-400 rounded-lg p-10 mt-8 text-center">
            <div {...getRootProps()} className="cursor-pointer">
                <input {...getInputProps()} />
                <img src="/path/to/icon.png" alt="Upload Icon" className="mx-auto mb-4" />
                <p className="text-lg">Drag and drop or <span className="text-blue-600 underline">Choose file</span> to upload</p>
            </div>
        </div>
    );
};

export default UploadRequestSheet;
