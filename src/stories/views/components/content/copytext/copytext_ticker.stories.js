import copytext from './copytext.hbs'
import copytext_json from './fixtures/copytext.json'
import copytext_media_components_json from './fixtures/copytext_media_components.json'
import copytext_non_media_components_json from './fixtures/copytext_non_media_components.json'
import copytext_posterteaser_json from './fixtures/copytext_posterteaser.json'
import copytext_additionalInfo_json from './fixtures/copytext_additionalInfo.json'
import copytext_cite_json from './fixtures/copytext_cite.json'
import copytext_podcastepisode_json from './fixtures/copytext_podcastepisode.json'
import copytext_faq_json from './fixtures/copytext_faq.json'
import copytext_jobposting_json from './fixtures/copytext_jobposting.json'
import copytext_image_json from './fixtures/copytext_image.json'
import copytext_infobox_json from './fixtures/copytext_infobox.json'
import copytext_downloadbox_json from './fixtures/copytext_downloadbox.json'
import copytext_filedownload_json from './fixtures/copytext_filedownload.json'
import copytext_externalservice_json from './fixtures/copytext_externalservice.json'
import copytext_video_json from './fixtures/copytext_video.json'
import copytext_audio_json from './fixtures/copytext_audio.json'
import copytext_audio_event_stream_json from './fixtures/copytext_audio_livestream.json'
import copytext_livestream_json from './fixtures/copytext_livestream.json'

const Template = ({ ...args }) => {
    return copytext({ ...args })
}

export default {
    title: 'Komponenten/Content/Copytext/Copytext im Ticker',
    decorators: [
        (Story) => {
            return `
            <div class="c-ticker__timelineBody timeline js-timeline-body">
                <ul class="c-ticker__itemList">
                    <li class="c-tickerItem " id="">
                        <div class="c-tickerItem__anchor" id="5cc13944-0c1a-4066-9bc4-a8d387b6ee57"></div>
                        <div class="c-tickerItem__dekoline"></div>
                        <div class="c-tickerItem__header">
                            <div class="c-tickerItem__time">
                                <time datetime="2023-11-30T11:43+0100">
                                    Do. 30.11.23, 11:43 Uhr
                                </time>
                            </div>
                            <div class="c-tickerItem__istop"><span class="c-tickerItem__istop__text">Top-Thema</span></div>
                        </div>
                        <div class="c-ticker__timeline">
                            <div class="c-ticker__timeline__dot"></div>
                            <div class="c-ticker__timeline__line"></div>
                        </div>
                        <div class="c-tickerItem__content">
                            <h3 class="c-tickerItem__title text__headline copytext__headline">Nach Krawallen: Politiker fordert hartes
                                Durchgreifen</h3>
                            ${Story()} 
                        </div>
                    </li>
                </ul>
            </div>
            <style>
 @media (min-width: 48em) {
	.timeline {
        max-width: 685px;
		margin-left: 6px;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
    }	
}

.c-ticker__timelineBody {
	grid-area: content;
	-webkit-order: 3;
	-ms-flex-order: 3;
	order: 3;
	-ms-grid-column: 2;
	-ms-grid-column-span: 3;
	-ms-grid-row: 3
}

@media (min-width: 64em) {
	.c-ticker__timelineBody {
		margin-top: 6px
	}
}

.c-ticker__timelineBody .pagination {
	padding-top: .875em
}

.c-ticker__timeline {
	position: absolute;
	height: 100%;
	-webkit-order: 1;
	-ms-flex-order: 1;
	order: 1;
	width: .21875rem;
	margin-left: .625rem;
	left: 0;
	top: 2rem;
	z-index: 1
}

.c-ticker__timeline__dot {
	width: .4375rem;
	height: .4375rem;
	background-color: #000;
	position: relative;
	top: -.0625rem;
	left: -.125rem;
	border-radius: .4375rem
}

@media (min-width: 48em) {
	.c-ticker__timeline__dot {
		top: 0
	}
}

.c-ticker__timeline__line {
	width: .0625rem;
	height: 100%;
	border-left: thin dotted #000;
	position: relative;
	left: .0625rem;
	top: -.25rem
}

@media (min-width: 48em) {
	.c-ticker__timeline {
		top: 2.5rem;
		left: 1.75rem
	}
}

@media (min-width: 64em) {
	.c-ticker__timeline {
		top: 2.375rem;
		left: .4375rem
	}
}

.c-tickerItem {
	position: relative;
	display: flex;
	flex-direction: column;
	border-bottom: 0.0625rem solid #efefef;
	padding: 1.25rem 1.375rem 0rem 1.75rem;
}

@media (min-width: 48em) and (max-width: 63.9375em) {
	.c-tickerItem {
		padding: 1.875rem 2.5rem 2.5rem 5rem;
	}
}

@media (min-width: 64em) {
	.c-tickerItem {
		padding: 1.75rem 1.25rem 1.75rem 2.5rem;
		width: 100%;
	}
}

.c-tickerItem__anchor {
	padding-top: 4rem;
	margin-top: -4rem;
}

@media (min-width: 64em) {
	.c-tickerItem__anchor {
		padding-top: 1rem;
		margin-top: -1rem;
	}
}

.c-tickerItem__dekoline {
	position: absolute;
	border-top: 0.0625rem solid #797979;
	width: 0.75rem;
	margin-left: -0.875rem;
	margin-top: 0.875rem;
}

@media (min-width: 48em) {
	.c-tickerItem__dekoline {
		width: 1.875rem;
		margin-left: -2.5rem;
		margin-top: 0.8125rem;
	}
}

@media (min-width: 64em) {
	.c-tickerItem__dekoline {
		width: 0.875rem;
		margin-left: -1.25rem;
	}
}

.c-tickerItem.-isPinned {
	border-left: 0.875rem solid #006dc1;
	padding-left: 0.875rem;
}

@media (min-width: 48em) and (max-width: 63.9375em) {
	.c-tickerItem.-isPinned {
		border-left: 2.5rem solid #006dc1;
		padding: 1.5rem 2.5rem 2.5rem 2.5rem;
	}
}

@media (min-width: 64em) {
	.c-tickerItem.-isPinned {
		border-left: 1.25rem solid #006dc1;
		padding: 1.5rem 1.25rem 1.75rem 1.25rem;
	}
}

.c-tickerItem.-isPinned .c-tickerItem__dekoline {
	display: none;
}

.c-tickerItem.-isPinned .c-tickerItem__time {
	padding-left: 0;
}

.c-tickerItem.-isTopnews {
	background: #efefef;
	border-bottom: 0.0625rem solid #fff;
}

.c-tickerItem.-isTopnews+.c-tickerItem__separator {
	background: #fff;
}

.c-tickerItem.-isTopnews .c-ticker__timeline__dot {
	width: 0.75rem;
	height: 0.75rem;
	top: -0.1875rem;
	left: -0.3125rem;
	border-radius: 0.75rem;
	background-color: #a3492d;
}

.c-tickerItem.-isTopnews .c-tickerItem__dekoline {
	border-color: #a3492d;
}

.c-tickerItem__time {
	font-family: RobotoSlab, serif;
	font-weight: normal;
	display: flex;
	color: #606060;
	font-size: 0.75rem;
	padding-right: 0.625rem;
}

@media (min-width: 48em) {
	.c-tickerItem__time {
		font-size: 0.875rem;
	}
}

.c-tickerItem__pin {
	display: inline-block;
	fill: #a3492d;
}

.c-tickerItem__pin::before {
	content: '|';
	position: relative;
	top: 0.1875rem;
	color: #a3492d;
}

.c-tickerItem__pin .icon {
	width: 1.0625rem;
	height: 0.9375rem;
	vertical-align: bottom;
}

@media (min-width: 48em) {
	.c-tickerItem__pin::before {
		top: 0;
	}

	.c-tickerItem__pin .icon {
		width: 1.1875rem;
		height: 1.1875rem;
	}
}

.c-tickerItem__istop {
	font-family: RobotoSlab, serif;
	font-weight: normal;
	display: inline-block;
	color: #a3492d;
}

.c-tickerItem__istop::before {
	content: '|';
	position: relative;
	left: 0.0625rem;
	top: 0.0625rem;
}

.c-tickerItem__istop__text {
	margin-left: 0.5625rem;
}

.c-tickerItem__header {
	font-size: 0.75rem;
	line-height: 1.0625rem;
	order: 1;
	display: flex;
	width: 100%;
	padding-top: 0.3125rem;
}

.c-tickerItem__header p:last-child {
	margin-bottom: 0;
}

@media (min-width: 48em) {
	.c-tickerItem__header {
		font-size: 0.875rem;
	}
}

.c-tickerItem__content {
	order: 2;
	margin-left: 0;
	margin-top: 0.625rem;
	margin-bottom: 1.25rem;
}

.c-tickerItem__content .copytext__clearBox {
	margin-top: 1.5rem;
	margin-bottom: 0.875rem;
}

.c-tickerItem__footer {
	order: 3;
	margin-top: 1.25rem;
	margin-bottom: 1.25rem;
	display: block;
}

.c-tickerItem__footer :only-child.ticker_sharing {
	margin-top: -0.25rem !important;
}

@media (min-width: 48em) {
	.c-tickerItem__footer {
		margin-bottom: 0px;
	}
}

.c-tickerItem__footer .c-tickerItem__authorWrapper {
	min-height: 2.5rem;
	min-width: 2.5rem;
}

.c-tickerItem__footer .ticker_sharing {
	position: relative;
	z-index: 1;
	margin-top: -2.75rem;
	float: right;
}

.c-tickerItem__footer .ticker_sharing .icon--teilen-button {
	fill: #006dc1;
}

.c-tickerItem__title {
	flex-grow: 1;
	color: #000;
	margin-top: 0.375rem;
}

.c-tickerItem__separator {
	height: 0.0625rem;
	background: #efefef;
}           


            </style>`
        },
    ],
    parameters: { layout: 'fullscreen', chromatic: { disableSnapshot: true } }
}

export const SnapshotWithMedia = {
    render: Template.bind({}),
    name: 'Snapshot 1',
    args: {
        ...copytext_media_components_json,
        _isTickerCopytext: true},
    parameters: {
        chromatic: { disableSnapshot: false },
    },
}

export const SnapshotWithoutMedia = {
    render: Template.bind({}),
    name: 'Snapshot 2',
    args: { 
        ...copytext_non_media_components_json,
        _isTickerCopytext: true},
    parameters: {
        chromatic: { disableSnapshot: false },
    },
}
