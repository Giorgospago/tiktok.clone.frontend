import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {CreateService} from "../../services/http/create.service";
import * as RecordRTC from "recordrtc/RecordRTC";

@Component({
    selector: 'app-create',
    templateUrl: './create.page.html',
    styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

    @ViewChild("videoPreview", {static: true})
    public videoPreview;

    public cameraPlace: boolean = true;
    public startTime: number = null;

    public recorder: RecordRTC;
    public recordOptions = {
        // audio, video, canvas, gif
        type: 'video',

        // audio/webm
        // audio/webm;codecs=pcm
        // video/mp4
        // video/webm;codecs=vp9
        // video/webm;codecs=vp8
        // video/webm;codecs=h264
        // video/x-matroska;codecs=avc1
        // video/mpeg -- NOT supported by any browser, yet
        // audio/wav
        // audio/ogg  -- ONLY Firefox
        // demo: simple-demos/isTypeSupported.html
        mimeType: 'video/webm;codecs=h264',

        // MediaStreamRecorder, StereoAudioRecorder, WebAssemblyRecorder
        // CanvasRecorder, GifRecorder, WhammyRecorder
        // recorderType: MediaStreamRecorder,

        // disable logs
        // disableLogs: true,

        // get intervals based blobs
        // value in milliseconds
        // timeSlice: 1000,

        // requires timeSlice above
        // returns blob via callback function
        // ondataavailable: function (blob) {
        // },

        // auto stop recording if camera stops
        // checkForInactiveTracks: false,

        // requires timeSlice above
        // onTimeStamp: function (timestamp) {
        // },

        // both for audio and video tracks
        // bitsPerSecond: 128000,

        // only for audio track
        // ignored when codecs=pcm
        // audioBitsPerSecond: 128000,

        // only for video track
        // videoBitsPerSecond: 128000,

        // used by CanvasRecorder and WhammyRecorder
        // it is kind of a "frameRate"
        // frameInterval: 90,

        // if you are recording multiple streams into single file
        // this helps you see what is being recorded
        // previewStream: this.previewStream.bind(this),

        // used by CanvasRecorder and WhammyRecorder
        // you can pass {width:640, height: 480} as well
        // video: HTMLVideoElement,

        // used by CanvasRecorder and WhammyRecorder
        canvas: {
            width: 1080,
            height: 1920
        },

        // used by StereoAudioRecorder
        // the range 22050 to 96000.
        // sampleRate: 96000,

        // used by StereoAudioRecorder
        // the range 22050 to 96000.
        // let us force 16khz recording:
        // desiredSampRate: 16000,

        // used by StereoAudioRecorder
        // Legal values are (256, 512, 1024, 2048, 4096, 8192, 16384).
        // bufferSize: 16384,

        // used by StereoAudioRecorder
        // 1 or 2
        // numberOfAudioChannels: 2,

        // used by WebAssemblyRecorder
        // frameRate: 30,

        // used by WebAssemblyRecorder
        // bitrate: 128000,

        // used by MultiStreamRecorder - to access HTMLCanvasElement
        // elementClass: 'multi-streams-mixer'
    };

    constructor(
        public createService: CreateService,
        private cd: ChangeDetectorRef
    ) {
    }

    ngOnInit() {
        this.initCamera();
    }

    public initCamera() {
        navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: this.cameraPlace ? "user" : "environment"
            },
            audio: true
        }).then((stream: any) => {
            this.videoPreview.nativeElement.srcObject = stream;
            this.recorder = RecordRTC(stream, this.recordOptions);
        });
    }

    public toggleRecord() {
        if (this.startTime === null) {
            this.startRecord();
        } else {
            this.stopRecord();
        }
    }

    public startRecord() {
        this.startTime = Date.now();
        this.recorder.startRecording();
        this.createService.videoInput.file = null;
        this.createService.videoInput.path = "";
    }

    public stopRecord() {
        this.startTime = null;
        this.recorder.stopRecording(() => {
            let blob = this.recorder.getBlob();
            const file = new File([blob], "video");

            this.createService.videoInput.file = file;
            this.createService.videoInput.path = URL.createObjectURL(file);
            this.cd.detectChanges();
        });
    }

    public toggleCamera() {
        this.cameraPlace = !this.cameraPlace;
        this.initCamera();
    }
}
