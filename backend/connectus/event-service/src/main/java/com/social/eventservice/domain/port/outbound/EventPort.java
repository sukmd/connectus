package com.social.eventservice.domain.port.outbound;

import java.util.List;

import com.social.eventservice.application.rest.response.EventDetailsResponse;
import com.social.eventservice.application.rest.response.PingsDetailsResponse;
import com.social.eventservice.domain.dto.MakeEventCommand;

public interface EventPort {
	void makeEvent(MakeEventCommand request);
	EventDetailsResponse detailsEvent(Long eventId);
	List<PingsDetailsResponse> spreadPings(Long userId, Long eventId);

}
