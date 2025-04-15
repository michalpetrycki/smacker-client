import { TestBed } from '@angular/core/testing';

import { SnackbarService } from './snackbar.service';

describe('SnackbarService', () => {
    let service: SnackbarService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(SnackbarService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call displayMessage with correct parameter', () => {
        const message = 'Test message';
        spyOn(service, 'displayMessage');
        service.displayMessage(message);
        expect(service.displayMessage).toHaveBeenCalled();
        expect(service.displayMessage).toHaveBeenCalledTimes(1);
        expect(service.displayMessage).toHaveBeenCalledWith(message);
    });

    it('should call open() function of snackbar with correct arguments', () => {
        const message = 'Test message';
        spyOn(service.snackBar, 'open');
        service.displayMessage(message);
        expect(service.snackBar.open).toHaveBeenCalled();
        expect(service.snackBar.open).toHaveBeenCalledTimes(1);
        expect(service.snackBar.open).toHaveBeenCalledWith(message, undefined, {
            duration: jasmine.any(Number),
        });
    });

    it('should call displayMessage() function when displayErrorMessage() function called', () => {
        const message = 'Test message';
        const spy = spyOn(service, 'displayMessage');
        service.displayErrorMessage(message);
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(
            spy.calls.mostRecent().args[0].indexOf('Something went wrong ;(')
        ).toBeGreaterThan(-1);
        expect(spy.calls.mostRecent().args[0].indexOf(message)).toBeGreaterThan(
            -1
        );
    });
});
