package social.connectus.location.application.rest.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateSpotResponse {
    private List<Long> spotIdList;
}
