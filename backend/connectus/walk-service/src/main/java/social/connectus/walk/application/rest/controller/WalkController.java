package social.connectus.walk.application.rest.controller;

import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Slice;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import social.connectus.walk.application.rest.request.*;
import social.connectus.walk.application.rest.response.CreateWalkResponse;
import social.connectus.walk.application.rest.response.GetAchievementsResponse;
import social.connectus.walk.application.rest.response.GetWalkResponse;
import social.connectus.walk.application.rest.response.GetWalksByUserResponse;
import social.connectus.walk.domain.command.*;
import social.connectus.walk.domain.ports.inbound.WalkUseCase;

import java.util.List;

@RestController
@RequestMapping("/walk")
@RequiredArgsConstructor
public class WalkController {

    private final WalkUseCase walkUseCase;

    @GetMapping("/health-check")
    public String healthCheck(){
        return "It's working on Walk-Service!";
    }

    @GetMapping("/feign-health-check")
    public String feignHealthCheck() {
        // TODO: 다른 모든 서비스의 healthCheck를 받아 json 객체로 반환
        return walkUseCase.feignHealthCheck();
    }

    @GetMapping("/{walkId}")
    public ResponseEntity<GetWalkResponse> getWalk(@PathVariable long walkId){
        GetWalkResponse response = GetWalkResponse.from(walkUseCase.getWalkById(walkId));
        return ResponseEntity.ok(response);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<GetWalksByUserResponse> getWalkByUser(@PathVariable long userId){
        GetWalksByUserResponse response = GetWalksByUserResponse.from(walkUseCase.getWalkByUser(userId));
        return ResponseEntity.ok(response);
    }

    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<CreateWalkResponse> createWalk(@RequestBody CreateWalkRequest request){
        // TODO: request 검증
        return ResponseEntity.ok(walkUseCase.createWalk(CreateWalkCommand.from(request)));
    }

    @PutMapping("/route-like")
    public ResponseEntity<String> routeLike(@RequestBody RouteLikeRequest request){
        walkUseCase.routeLike(RouteLikeCommand.from(request));
        return ResponseEntity.ok("Like is successfully registered.");
    }

    @PatchMapping("/route-share")
    public ResponseEntity<String> routeShare(@RequestBody RouteShareRequest request){
        walkUseCase.routeShare(RouteShareCommand.from(request));
        return ResponseEntity.ok("Successfully shared.");
    }

    @PatchMapping("/route-protect")
    public ResponseEntity<String> routeShare(@RequestBody RouteProtectRequest request){
        walkUseCase.routeProtect(RouteProtectCommand.from(request));
        return ResponseEntity.ok("Successfully protected.");
    }

    @PatchMapping("/route-track")
    public ResponseEntity<String> routeTrack(@RequestBody RouteTrackRequest request){
        walkUseCase.routeTrack(RouteTrackCommand.from(request));
        return ResponseEntity.ok("Successfully tracked.");
    }

    @GetMapping("/position")
    public ResponseEntity<Slice<Long>> getWalksByPosition(@RequestBody GetWalksByPositionRequest request){
        Slice<Long> walkIdSlice = walkUseCase.getWalksByPosition(GetWalksByPositionCommand.from(request));
        return ResponseEntity.ok(walkIdSlice);
    }

    @GetMapping("/end-walk")
    public ResponseEntity<GetAchievementsResponse> getAchievementsByWalk(@RequestBody GetAchievementsRequest request){
        List<Long> achievementIds = walkUseCase.getAchievementsByWalk(GetAchievementsCommand.from((request)));
//        return ResponseEntity.ok(GetAchievementsResponse.builder().achievementIds(achievementIds).build());
        return null;
    }

}
