package social.connectus.domain.ports.inbound;

import social.connectus.application.rest.request.CloseGatherRequest;
import social.connectus.common.exception.GlobalException;
import social.connectus.common.exception.ResourceNotFoundException;

public interface CloseGatherUseCase {
    void closeGather(CloseGatherRequest closeGatherRequest) throws ResourceNotFoundException, GlobalException;
}
