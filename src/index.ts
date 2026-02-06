import './style.scss';

class ModalHandler {
    private modal: HTMLElement;

    constructor() {
        this.modal = document.getElementById('acceptance-modal')!;
    }

    public showModal(): void {
        this.modal.classList.add('show');
    }
}

const modalHandler = new ModalHandler();

class ValentineProposal {
    private yesButton: HTMLElement;
    private noButton: HTMLElement;
    private proposalContainer: HTMLElement;

    constructor() {
        this.yesButton = document.getElementById('yes-button')!;
        this.noButton = document.getElementById('no-button')!;
        this.proposalContainer = document.querySelector('.proposal-container')!;
        this.addEventListeners();
    }

    private addEventListeners(): void {
        this.yesButton.addEventListener('click', this.handleYesClick.bind(this));

        if (!this.isMobile()) {
            this.proposalContainer.addEventListener('mousemove', this.handleMouseMove.bind(this));
            this.proposalContainer.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
        }
    }

    private handleYesClick(): void {
        modalHandler.showModal();
    }

    private handleMouseMove(event: MouseEvent): void {
        const { clientX, clientY } = event;
        const containerRect = this.proposalContainer.getBoundingClientRect();
        const buttonWidth = this.yesButton.offsetWidth;
        const buttonHeight = this.yesButton.offsetHeight;

        // Calculate new position ensuring the button stays inside the container
        const newX = Math.max(Math.min(clientX - buttonWidth / 2, containerRect.right - buttonWidth), containerRect.left);
        const newY = Math.max(Math.min(clientY - buttonHeight / 2, containerRect.bottom - buttonHeight), containerRect.top);

        this.yesButton.style.left = `${newX}px`;
        this.yesButton.style.top = `${newY}px`;
        this.yesButton.style.opacity = '1';
    }

    private handleMouseLeave(): void {
        this.yesButton.style.opacity = '0';
    }

    private isMobile(): boolean {
        return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    }

}

new ValentineProposal();

class BackgroundEffects {
    private container: HTMLElement;

    constructor() {
        this.container = document.querySelector('.background-effects')!;
        this.generateEffects();
    }

    private generateEffects(): void {
        for (let i = 0; i < 50; i++) {
            const effect = document.createElement('div');
            effect.className = 'effect';
            effect.style.left = `${Math.random() * 100}vw`;
            effect.style.top = `${Math.random() * 100}vh`;
            effect.style.animationDelay = `${Math.random() * 5}s`;
            this.container.appendChild(effect);
        }
    }
}

new BackgroundEffects();

class ProposalTextEffect {
    private nameContainer: HTMLElement;
    private questionContainer: HTMLElement;
    private quoteContainer: HTMLElement;
    private buttonContainer: HTMLElement;
    private nameText: string;
    private questionText: string;
    private quoteText: string;

    constructor() {
        this.nameContainer = document.querySelector('.proposal-container h2')!;
        this.quoteContainer = document.querySelector('.proposal-container .loving-quote')!;
        this.questionContainer = document.querySelector('.proposal-container h1')!;
        this.buttonContainer = document.querySelector('.proposal-container .button-container')!;
        this.nameText = this.nameContainer.textContent || '';
        this.quoteText = this.quoteContainer.textContent || '';
        this.questionText = this.questionContainer.textContent || '';
        this.nameContainer.textContent = '';
        this.quoteContainer.textContent = '';
        this.questionContainer.textContent = '';
        this.typeText(this.nameContainer, this.nameText, () => {
            this.typeText(this.quoteContainer, this.quoteText, () => {
                this.typeText(this.questionContainer, this.questionText);
                this.buttonContainer.style.display = 'block';
            });
        });
    }

    private typeText(container: HTMLElement, text: string, callback?: () => void): void {
        let index = 0;
        const interval = setInterval(() => {
            if (index < text.length) {
                container.textContent += text[index];
                index++;
            } else {
                clearInterval(interval);
                if (callback) callback();
            }
        }, 100); // Typing speed
    }
}

new ProposalTextEffect();

class MobileAcceptanceHandler {
    private yesButton: HTMLElement;
    private noButton: HTMLElement;
    private proposalContainer: HTMLElement;

    constructor() {
        this.yesButton = document.getElementById('yes-button')!;
        this.noButton = document.getElementById('no-button')!;
        this.proposalContainer = document.querySelector('.proposal-container')!;
        this.addNoButtonListener();
    }

    private addNoButtonListener(): void {
        this.noButton.addEventListener('click', this.handleNoClick.bind(this));
    }

    private handleNoClick(): void {
        const containerRect = this.proposalContainer.getBoundingClientRect();
        const randomX = Math.random() * (containerRect.width - this.noButton.offsetWidth);
        const randomY = Math.random() * (containerRect.height - this.noButton.offsetHeight);
        this.noButton.style.position = 'absolute';
        this.noButton.style.left = `${containerRect.left + randomX}px`;
        this.noButton.style.top = `${containerRect.top + randomY}px`;
    }
}

new MobileAcceptanceHandler();